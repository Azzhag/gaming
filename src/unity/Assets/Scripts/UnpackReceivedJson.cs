using UnityEngine;
using HoloToolkit.Unity;
using System.Collections.Generic;


public class UnpackReceivedJson : Singleton<UnpackReceivedJson> {

    public SpawnIceLiceForSwarm SpawnIceLiceScript;
    public Transform FormationPrefab;
    public FireFlyManager FireflyManagerScript;
    public ArachnotankManager TankManagerScript;



        private void ResolvePlayerAction(JsonForAzure json)
        {
            if (json.spec != Constants.MSG_PLAYER_CURRENT)
            {
                // log undefined spec message
                return;
            }

            switch (json.action)
            {
                case Constants.MSG_ACTION_GET_SCORE:
                    ScoreSingleton.Instance.SetPlayerScore(json.payload.playerScore);
                    break;
                default:
                    // log unhandled action message
                    break;
            }
        }

        private void ResolveNpcAction(JsonForAzure json)
        {
            switch (json.spec)
            {
                case Constants.MSG_NPC_ICE_LICE:
                    ActionForIceLice(json);
                    break;
                case Constants.MSG_NPC_ARAC_TANK:
                    ActionForArachnoTank(json);
                    break;
                case Constants.MSG_NPC_FIRE_FLY:
                    ActionForFireFly(json);
                    break;
                case Constants.MSG_NPC_FORMATION:
                    ActionForFormation(json);
                    break;
                default:
                    break;
            }
        }

        private void ResolveInitAction(JsonForAzure json)
        {
            switch (json.action)
            {
                case Constants.MSG_ACTION_INIT:
                    {
                        WebSocketClientSingleton.Instance.SetInstanceId(json.payload.instance);
                    }
                    break;
                default:
                    //log error 
                    break;
            }
        }

        private void ActionForArachnoTank(JsonForAzure json)
        {
            switch (json.action)
            {
                case Constants.MSG_ACTION_BARRAGE:
                    TankManagerScript.BeginBarrage();
                    break;
                default:
                    break;
            }
        }

        private void ActionForFireFly(JsonForAzure json)
        {
            switch (json.action)
            {
                case Constants.MSG_ACTION_STRIKE:
                    FireflyManagerScript.BeginAirstrike();
                    break;
                default:
                    break;
            }
        }

        private void ActionForIceLice(JsonForAzure json)
        {
            switch (json.action)
            {
                case Constants.MSG_ACTION_TOXIC:
                    var newToxicIceLice = DictionaryOfIds.Instance.GetGameObject(json.payload.npcId);
                    newToxicIceLice.SendMessage(Constants.METHOD_MAKE_TOXIC, SendMessageOptions.DontRequireReceiver);
                    break;
                default:
                    break;
            }
        }

        private void InitFormation(Vector3 position, string id, List<string> members)
        {
            var formation = Instantiate(FormationPrefab, position, Quaternion.identity).gameObject;
            formation.SendMessage(Constants.METHOD_FORMATION_INIT, id, SendMessageOptions.DontRequireReceiver);
            if (members.Count == 0)
            {
                return;
            }
            formation.SendMessage(Constants.METHOD_FORMATION_ASSIGN, members, SendMessageOptions.DontRequireReceiver);
        }

        private void MoveFormation(Vector3 position, string id, List<Vector3> waypoints)
        {
            var formation = DictionaryOfIds.Instance.GetGameObject(id);
            if (formation == null)
            {
                return;
            }

            formation.SendMessage(Constants.METHOD_FORMATION_POSITION, position, SendMessageOptions.DontRequireReceiver);
            if (waypoints.Count == 0)
            {
                return;
            }
            formation.SendMessage(Constants.METHOD_FORMATION_OFFSETS, waypoints, SendMessageOptions.DontRequireReceiver);
        }

        private void ActionForFormation(JsonForAzure json)
        {
            switch (json.action)
            {
                case Constants.MSG_ACTION_SPAWN:
                    InitFormation(json.payload.waypoint, json.payload.formationId, new List<string>());
                    SpawnIceLiceScript.SpawnEnemiesForFormation(json.payload.formationId, json.payload.listOfMembers);
                    break;
                case Constants.MSG_FORMATION_SPLIT:
                    Vector3 primaryFormationPosition = DictionaryOfIds.Instance.GetGameObject(json.payload.formationId).transform.position;
                    DictionaryOfIds.Instance.RemoveFormation(json.payload.formationId);

                    InitFormation(primaryFormationPosition, json.payload.formationId, json.payload.listOfMembers);
                    InitFormation(json.payload.waypoint, json.payload.secondaryFormationId, json.payload.secondaryListOfMembers);
                    break;
                case Constants.MSG_FORMATION_MERGE:
                    Vector3 mergedPosition = DictionaryOfIds.Instance.GetGameObject(json.payload.formationId).transform.position;
                    DictionaryOfIds.Instance.RemoveFormation(json.payload.formationId);
                    DictionaryOfIds.Instance.RemoveFormation(json.payload.secondaryFormationId);

                    InitFormation(mergedPosition, json.payload.formationId, json.payload.listOfMembers);
                    break;
                case Constants.MSG_FORMATION_REFORM:
                    MoveFormation(json.payload.waypoint, json.payload.formationId, json.payload.listOfWaypoints);
                    break;
                case Constants.MSG_FORMATION_MOVE:
                    MoveFormation(json.payload.waypoint, json.payload.formationId, new List<Vector3>());
                    break;
                case Constants.MSG_FORMATION_SCATTER:
                    foreach (string id in json.payload.listOfMembers)
                    {
                        GameObject formationForScatter = DictionaryOfIds.Instance.GetGameObject(id);
                        formationForScatter.SendMessage(Constants.METHOD_SCATTER, SendMessageOptions.DontRequireReceiver);
                    }
                    break;
                default:
                    //log error unhandled action
                    break;
            }
        }

        public void UnpackJsonString(string receivedString)
        {
            JsonForAzure receivedJson = JsonUtility.FromJson<JsonForAzure>(receivedString);

            switch (receivedJson.type)
            {
                case Constants.MSG_TYPE_PLAYER:
                    ResolvePlayerAction(receivedJson);
                    break;
                case Constants.MSG_TYPE_ENEMY:
                    ResolveNpcAction(receivedJson);
                    break;
                case Constants.MSG_TYPE_INIT:
                    ResolveInitAction(receivedJson);
                    break;
                default:
                    //log error unhandled msg type
                    break;
            }
        }
    }
