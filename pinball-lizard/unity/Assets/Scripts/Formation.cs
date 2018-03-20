using System.Collections.Generic;
using UnityEngine;

public class Formation : MonoBehaviour {

    private List<Vector3> _listOfOffsets = new List<Vector3>();
    private List<GameObject> _listOfMembers = new List<GameObject>();
    private string _formationId;
    private List<Vector3> _hexFormation = new List<Vector3>();
    private const float _DISTANCE = 2.0f;

    void OnEnable()
    {
        BuildHexFlowerFormationOffsets();
    }

    private void SetNewOffsets ()
    {
        for (int i = 0; i < _listOfMembers.Count; i++)
        {
            Vector3 waypoint = transform.position + _listOfOffsets[i];
            if (_listOfMembers[i] != null)                            
                _listOfMembers[i].SendMessage(Constants.METHOD_SET_WAYPOINT, waypoint, SendMessageOptions.DontRequireReceiver);
        }
    }

    /// <summary>
    /// Called by UnpackReceivedJson when moving formations.
    /// </summary>
    public void SetFormationPosition (Vector3 position)
    {
        transform.position = position;
        SetNewOffsets();
    }

    /// <summary>
    /// Called by UnpackReceivedJson when spawning, merging, and splitting formations.
    /// </summary>
    public void SetFormationId (string idFromAzure)
    {
        _formationId = idFromAzure;
        DictionaryOfIds.Instance.AddToDictionary(_formationId, this.gameObject);
    }

    /// <summary>
    /// Called by UnpackReceivedJson when merging/splitting formations.
    /// </summary>
    public void AddListOfMembers (List<string> listOfMembers)
    {
        for (int i = 0; i < listOfMembers.Count; i++)
        {
            GameObject newMember = DictionaryOfIds.Instance.GetGameObject(listOfMembers[i]);
            if (newMember != null)
            {
                AddMember(newMember);
                newMember.SendMessage(Constants.METHOD_SET_FORMATION_SCRIPT, this, SendMessageOptions.DontRequireReceiver);
            }
        }
    }

    /// <summary>
    /// Called by SpawnIceLiceForSwarm for each individual new spawn
    /// </summary>
    public void AddMember(GameObject newMember)
    {
        _listOfMembers.Add(newMember);
        
        int positionIndex = _listOfMembers.IndexOf(newMember);
        Vector3 waypoint = transform.position + _listOfOffsets[positionIndex];

        if (newMember != null)
        {
            newMember.SendMessage(Constants.METHOD_SET_WAYPOINT, waypoint, SendMessageOptions.DontRequireReceiver);
        } else
        {
            Debug.Log("newmember is null");
        }
    }

    /// <summary>
    /// Called by DestroyEnemyUnit
    /// </summary>
    public void RemoveDestroyedMember(GameObject memberToRemove, string npcId)
    {
        _listOfMembers.Remove(memberToRemove);
        WebSocketClientSingleton.Instance.SendDeadNpcMessage(_formationId, npcId);
    }

    /// <summary>
    /// Called by UnpackReceivedJson
    /// </summary>
    public void Scatter ()
    {
        foreach (GameObject member in _listOfMembers)
        {
            Vector3 scatterWaypoint = new Vector3(
                Random.Range(-20f, 20f),
                Random.Range(50f, 75f),
                Random.Range(-5f, -50f));

            if (member != null) 
                member.SendMessage(Constants.METHOD_SET_WAYPOINT, scatterWaypoint, SendMessageOptions.DontRequireReceiver);
        }
    }

    private void BuildHexFlowerFormationOffsets ()
    {
        _hexFormation.Add(new Vector3(1f * _DISTANCE, 2f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(2f * _DISTANCE, 0f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(1f * _DISTANCE, -2f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-1f * _DISTANCE, -2f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-2f * _DISTANCE, 0f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-1f * _DISTANCE, 2f * _DISTANCE, 0f)); 
        _hexFormation.Add(new Vector3(2f * _DISTANCE, 4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(4f * _DISTANCE, 4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(5f * _DISTANCE, 2f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(4f * _DISTANCE, 0f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(5f * _DISTANCE, -2f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(4f * _DISTANCE, -4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(2f * _DISTANCE, -4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(1f * _DISTANCE, -6f * _DISTANCE, 0f)); 
        _hexFormation.Add(new Vector3(-1f * _DISTANCE, -6f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-2f * _DISTANCE, -4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-4f * _DISTANCE, -4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-5f * _DISTANCE, -2f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-4f * _DISTANCE, 0f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-5f * _DISTANCE, 2f * _DISTANCE, 0f)); 
        _hexFormation.Add(new Vector3(-4f * _DISTANCE, 4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-2f * _DISTANCE, 4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-1f * _DISTANCE, 6f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(1f * _DISTANCE, 6f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(2f * _DISTANCE, 8f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(4f * _DISTANCE, 8f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(5f * _DISTANCE, 6f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(7f * _DISTANCE, 6f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(8f * _DISTANCE, 4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(7f * _DISTANCE, 2f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(8f * _DISTANCE, 0f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(7f * _DISTANCE, -2f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(8f * _DISTANCE, -4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(7f * _DISTANCE, -6f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(5f * _DISTANCE, -6f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(4f * _DISTANCE, -8f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(2f * _DISTANCE, -8f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(1f * _DISTANCE, -10f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-1f * _DISTANCE, 10f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-2f * _DISTANCE, -8f * _DISTANCE, 0f)); 
        _hexFormation.Add(new Vector3(-4f * _DISTANCE, -8f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-5f * _DISTANCE, -6f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-7f * _DISTANCE, -6f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-8f * _DISTANCE, -4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-7f * _DISTANCE, -2f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-8f * _DISTANCE, 0f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-7f * _DISTANCE, 2f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-8f * _DISTANCE, 4f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-7f * _DISTANCE, 6f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-5f * _DISTANCE, 6f * _DISTANCE, 0f)); 
        _hexFormation.Add(new Vector3(-4f * _DISTANCE, 8f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-2f * _DISTANCE, 8f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(-1f * _DISTANCE, 10f * _DISTANCE, 0f));
        _hexFormation.Add(new Vector3(1f * _DISTANCE, 10f * _DISTANCE, 0f));

        _listOfOffsets = _hexFormation;
    }
}
