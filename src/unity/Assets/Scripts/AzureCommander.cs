using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using HoloToolkit.Unity; //for Singleton
using System.Linq; // for dictionary sorting  probably don't need it anymore



public class AzureCommander : Singleton<AzureCommander>
{
    private string _motherSwarmFormationId;
    private List<string> _listMotherSwarmMembers = new List<string>();
    private List<string> _listPlayerSwarmMembers = new List<string>();
    private Dictionary<string, List<string>> _dictionaryOfFormations = new Dictionary<string, List<string>>();  //formationId, npcIds of members
    public float _radius;
    private float _lastActionTime;
    public float _actionTimer;
    private int totalEnemies;
    private int totalFormations;
    private string _fireflyManager;
    private string _tankManager;
    private bool _clearFieldForAirstrike;
    private float _timeForNextAirstrike;
    private bool _readyForAirstrike;
    public bool _testStarOffsets;


    void Start()
    {
        _lastActionTime = Time.time + 5;
        SpawnFormation(6);
        SpawnFormation(6);
        SpawnFormation(6);
        SpawnFormation(6);
        SpawnFormation(6);
        SpawnFormation(6);

        SetupFireflyManager();
        SetupArachnotankManager();
    }

    void Update()
    {


        if (Time.time > _lastActionTime + _actionTimer)
        {
            ChooseAnAction();
        }

    }

    private void SetupFireflyManager ()
    {
        JsonForAzure message = new JsonForAzure();
        message.type = 1;
        message.spec = 3;
        message.action = 0;  // 0 == spawn ~~ init
        message.payload.formationId = GenerateRandomId();          // no need to save this Id within this script?

        string jsonString = JsonUtility.ToJson(message);
        UnpackReceivedJson.Instance.UnpackJsonString(jsonString);
    }

    private void SetupArachnotankManager ()
    {
        JsonForAzure message = new JsonForAzure();
        message.type = 1;
        message.spec = 2;
        message.action = 0;  // 0 == spawn ~~ init
        message.payload.formationId = GenerateRandomId();

        string jsonString = JsonUtility.ToJson(message);
        UnpackReceivedJson.Instance.UnpackJsonString(jsonString);
    }

    private void TankBarrage ()
    {
        JsonForAzure message = new JsonForAzure();
        message.type = 1;       // enemy
        message.spec = 2;       // tank
        message.action = 4;     // 4 = do barrage
        message.payload.formationId = _fireflyManager;

        string jsonString = JsonUtility.ToJson(message);
        UnpackReceivedJson.Instance.UnpackJsonString(jsonString);

        _timeForNextAirstrike = Time.time + Random.Range(15f, 20f);
        Invoke("ResetClearFieldBool", 7);

    }

    private void ScatterIceLice ()
    {
        JsonForAzure message = new JsonForAzure();
        message.type = 1;
        message.spec = 4;
        message.action = 8;  // 8 = scatter formation

        List<string> listOfFormationIds = new List<string>();
        foreach (KeyValuePair<string, List<string>> kvp in _dictionaryOfFormations)
        {
            string formationId = kvp.Key;
            listOfFormationIds.Add(formationId);
        }
        message.payload.listOfMembers = listOfFormationIds;

        string jsonString = JsonUtility.ToJson(message);
        UnpackReceivedJson.Instance.UnpackJsonString(jsonString);

        _clearFieldForAirstrike = true;
    }

    public void SetReadyForAirstrike ()
    {
        _readyForAirstrike = true;
    }

    private void Airstrike ()
    {
        JsonForAzure message = new JsonForAzure();
        message.type = 1;       // enemy
        message.spec = 3;       // firefly
        message.action = 4;     // 4 = do airstrike
        message.payload.formationId = _fireflyManager;

        string jsonString = JsonUtility.ToJson(message);
        UnpackReceivedJson.Instance.UnpackJsonString(jsonString);

        _readyForAirstrike = false;
        _timeForNextAirstrike = Time.time + Random.Range(15f, 20f);
        Invoke("ResetClearFieldBool", 3);
    }

    private void ResetClearFieldBool()
    {
        _clearFieldForAirstrike = false;
    }

    private void NewFormationWaypoints ()
    {
        List<string> listOfFormationIds = new List<string>();
        foreach (KeyValuePair<string, List<string>> kvp in _dictionaryOfFormations)
        {
            string formationId = kvp.Key;
            listOfFormationIds.Add(formationId);
        }
        int randomInt = Random.Range(1, listOfFormationIds.Count);  // not 0, as that formation is already on the player, and we want that to change every time
        string formationOnPlayer = listOfFormationIds[randomInt];   // pick a random formation in the list
        listOfFormationIds.RemoveAt(randomInt);                     // remove random fomation from the list
        listOfFormationIds.Insert(0, formationOnPlayer);            // add that formation back into the list at index[0]; this formation will be on the Player
        List<Vector3> listOfWaypoints = new List<Vector3>();        // create a list of (empty) Waypoints
        for (int i = 0; i < listOfFormationIds.Count; i++)
        {
            Vector3 zero = new Vector3(0f, 15f, -5f);               // the location of the Player
            listOfWaypoints.Add(zero);                              // initialize the list and set all Waypoints as the same location
        }
        for (int j = 1; j < listOfWaypoints.Count; j++)             // check each waypoint, starting at index[1]. (index[0] is on the player, and we already know its desired location)
        {
            List<Vector3> listOfOthers = new List<Vector3>();       // we'll be comparing this Formation to the others; might be no other formations, might be 10.
            for (int x = 0; x < listOfWaypoints.Count; x++)         // I had to copy the list this way so that listOfOthers.RemoveAt(j) wouldn't remove from listOfWaypoints, too
            {
                listOfOthers.Add(listOfWaypoints[x]);
            }
            listOfOthers.RemoveAt(j);                               // don't compare the waypoint to its own copy (distance would always = zero)
            bool tooClose = true;                                   // we know that they're all too close in the beginning (all at exact same point in space)
            float minimumDistance = 30f;                            // minimum distance between all waypoints
            while (tooClose)
            {
                listOfWaypoints[j] = RandomVector3();               // assign a random waypoint to this Formation

                for (int z = 0; z < listOfOthers.Count; z++)        // need to check distance to all members of "Others"
                {
                    float distance = Vector3.Distance(listOfWaypoints[j], listOfOthers[z]);

                    if (distance < minimumDistance)                 // if too close
                    {
                        tooClose = true;                            
                        break;                                      // end this loop and try again
                    }
                    else
                    {
                        tooClose = false;
                    }
                }
                minimumDistance -= 0.1f;                            // slowly decrease minimum distance so that 'while loop' achieves maximum distance possible without looping infinitely
            }
        }
        for (int k = 0; k < listOfFormationIds.Count; k++)
        {
            JsonForAzure message = new JsonForAzure();
            message.type = 1;
            message.spec = 4;
            message.action = 7;  // 7 = new Waypoints for Formations

            message.payload.formationId = listOfFormationIds[k];
            message.payload.waypoint = listOfWaypoints[k];

            string jsonString = JsonUtility.ToJson(message);
            UnpackReceivedJson.Instance.UnpackJsonString(jsonString);
        }
    }

    void ChooseAnAction()
    {
        _lastActionTime = Time.time;
        
        if (Time.time > _timeForNextAirstrike /*&& _readyForAirstrike*/ )
        {
            ScatterIceLice();
            int random = Random.Range(0, 2);
            if (random == 0)
                TankBarrage();
            else
                Invoke("Airstrike", 1f);
        }

        if (_clearFieldForAirstrike == false)
        {
            totalEnemies = 0;
            totalFormations = 0;

            List<KeyValuePair<string, List<string>>> listFormations = new List<KeyValuePair<string, List<string>>>();

            // build this list first, then check through it.  prevents the "out of sync" error.
            foreach (KeyValuePair<string, List<string>> kvp in _dictionaryOfFormations)
            {
                listFormations.Add(kvp);
            }

            KeyValuePair<string, List<string>> largestFormation = new KeyValuePair<string, List<string>>();
            foreach (KeyValuePair<string, List<string>> kvp in _dictionaryOfFormations)
            {
                if (largestFormation.Value == null || kvp.Value.Count > largestFormation.Value.Count)   // which Formation contains the most IceLice?
                {
                    largestFormation = kvp;
                }
            }

            foreach (KeyValuePair<string, List<string>> kvp in listFormations)
            {
                totalEnemies += kvp.Value.Count;                // count total number of IceLice
                totalFormations += 1;                           // count total number of IceLice formations

                

                if (kvp.Value.Count < 6 && kvp.Value != largestFormation.Value)   // if a Formation is too small, merge it with the largest Formation
                {
                    MergeTwoFormations(kvp, largestFormation);
                }

                if (kvp.Value.Count >= 24)
                    SplitOneFormation(kvp.Key);
            }


            if (totalFormations < 12)                            // if we don't have enough Formations, spawn a new one
            {
                SpawnFormation(6);
            }

            if (_clearFieldForAirstrike == false)
            {
                NewFormationWaypoints();                            // move all of the Formations around the playfield
            }
        }
    }

    private void RandomizeAllFormationsOffsets ()
    {
        List<Vector3> listOfOffsets = new List<Vector3>();
        listOfOffsets.Add(new Vector3(0f, 0f, 0f));    // index[0] = center point
        for (int i = 0; i < 100; i++)
        {
            float randX = Random.Range(-_radius, _radius);
            float randY = Random.Range(-_radius, _radius);
            float randZ = Random.Range(-_radius, _radius);
            listOfOffsets.Add(new Vector3(randX, randY, randZ));
        }

        foreach (KeyValuePair<string, List<string>> kvp in _dictionaryOfFormations)
        {
            JsonForAzure message = new JsonForAzure();
            message.type = 1;
            message.spec = 4;
            message.action = 6;  // 6 = new Offsets
            message.payload.formationId = kvp.Key;
            message.payload.waypoint = RandomVector3();

            message.payload.listOfWaypoints = listOfOffsets;

            string jsonString = JsonUtility.ToJson(message);
            UnpackReceivedJson.Instance.UnpackJsonString(jsonString);
        }
    }

  
    private void MergeTwoFormations (KeyValuePair<string, List<string>> formationA, KeyValuePair<string, List<string>> formationB)
    {
        _dictionaryOfFormations.Remove(formationA.Key);
        _dictionaryOfFormations.Remove(formationB.Key);

        JsonForAzure message = new JsonForAzure();
        message.type = 1;
        message.spec = 4;
        message.action = 5; // 5 = merge
        message.payload.formationId = formationA.Key;                       // the "base" formation
        message.payload.secondaryFormationId = formationB.Key;              // add these members to the "base"

        for (int i = 0; i < formationB.Value.Count; i++)
        {
            formationA.Value.Add(formationB.Value[i]);
        }

        _dictionaryOfFormations.Add(formationA.Key, formationA.Value);

        message.payload.listOfMembers = formationA.Value;

        string jsonString = JsonUtility.ToJson(message);
        UnpackReceivedJson.Instance.UnpackJsonString(jsonString);

        Debug.Log("MergeTwoFormations; formation count = " + _dictionaryOfFormations.Values.Count);
    }

    private Vector3 RandomVector3 ()
    {
        float xPos = Random.Range(-30, 30);
        float yPos = Random.Range(10, 30);
        float zPos = Random.Range(-50, 0);
        Vector3 randomVector3 = new Vector3(xPos, yPos, zPos);
        return randomVector3;
    }

    private void SplitOneFormation(string primaryFormationId)
    {       
        JsonForAzure message = new JsonForAzure();
        message.type = 1;       // type 1 == enemy
        message.spec = 4;       // spec 4 == formation
        message.action = 4;     // action 4 == split (spawn 2 new, delete 1 old)
        message.payload.formationId = primaryFormationId;                       // the "from" formation
        string secondaryFormationId = GenerateRandomId();
        message.payload.secondaryFormationId = secondaryFormationId;            // the "to" formation
        message.payload.waypoint = RandomVector3();                             // spawn position of the "to" formation

        List<string> listFromPrimaryFormation = new List<string>();
        List<string> listOut;
        _dictionaryOfFormations.TryGetValue(primaryFormationId, out listOut);
        listFromPrimaryFormation = listOut;

        List<string> listToSecondaryFormation = new List<string>();

        int newFormationSize = listFromPrimaryFormation.Count - 6;              // the new formation will get every member after #6 from the original formation
        for (int i = 0; i < newFormationSize; i++)
        {
            int lastEnemyInList = listFromPrimaryFormation.Count - 1;           // get index of the last enemy in this Formation's list
            string enemyId = listFromPrimaryFormation[lastEnemyInList];         // get that enemy's ID
            listToSecondaryFormation.Add(enemyId);                              // add this enemy to formation #2
            listFromPrimaryFormation.Remove(enemyId);                           // remove it from formation #1
        }

        _dictionaryOfFormations.Remove(primaryFormationId);                             // remove reference to the original formation            
        _dictionaryOfFormations.Add(primaryFormationId, listFromPrimaryFormation);      // and replace it with 2 new references 
        _dictionaryOfFormations.Add(secondaryFormationId, listToSecondaryFormation);   

        message.payload.listOfMembers = listFromPrimaryFormation;
        message.payload.secondaryListOfMembers = listToSecondaryFormation;

        string jsonString = JsonUtility.ToJson(message);
        UnpackReceivedJson.Instance.UnpackJsonString(jsonString);

        Debug.Log("SplitOneFormation; formation count = " + _dictionaryOfFormations.Values.Count);
    }

    private void SpawnFormation(int quantity)
    {
        JsonForAzure message = new JsonForAzure();
        message.type = 1;       // type 1 == enemy
        message.spec = 4;       // spec 4 == formation
        message.action = 0;     // action 0 == spawn
        message.payload.formationId = GenerateRandomId();       // this new formation get a new, random ID

        for (int i = 0; i < quantity; i++)                     
        {
            string newId = GenerateRandomId();                  // create a bunch of new, random IDs for the new IceLice
            message.payload.listOfMembers.Add(newId);           // add these IDs into our JSON message                 
        }

        Vector3 waypoint = RandomVector3();                     // this new formation will go to a random Vector3
        message.payload.waypoint = waypoint;

        _dictionaryOfFormations.Add(message.payload.formationId, message.payload.listOfMembers);

        string jsonString = JsonUtility.ToJson(message);
        UnpackReceivedJson.Instance.UnpackJsonString(jsonString);
    }

    private string GenerateRandomId()
    {
        string randomId = Random.Range(0, 1000000000).ToString(); // 1 in a billion
        return randomId;
    }

    /// <summary>
    /// Called by a Formation, which is called by an individual enemy when it is destroyed.
    /// </summary>
    public void EnemyDestroyedMessage(string formationId, string npcId)
    {
        _dictionaryOfFormations[formationId].Remove(npcId);
    }
}
