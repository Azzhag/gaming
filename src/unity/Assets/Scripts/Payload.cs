using System;
using System.Collections.Generic;
using UnityEngine;

[Serializable]
public class Payload
{
    public string instance;
    public bool active;
    public int playerScore;
    public string playerName;
    public int npcWaypoint;
    public string npcId;
    public string formationId;
    public string secondaryFormationId;
    public bool enableMixer;
    public string color;
    public List<string> listOfMembers = new List<string>();
    public List<string> secondaryListOfMembers = new List<string>();
    public Vector3 waypoint;
    public List<Vector3> listOfWaypoints = new List<Vector3>();
}
