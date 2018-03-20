using System.Collections.Generic;
using UnityEngine;

public class ArachnotankManager : MonoBehaviour {

    public List<GameObject> ListOfTanks = new List<GameObject>();

    public void BeginBarrage ()
    {
        foreach (GameObject tank in ListOfTanks)
        {
            tank.SendMessage(Constants.METHOD_TANK_DESCEND, SendMessageOptions.DontRequireReceiver);
        }
    }
}
