using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PressButtonToStartGame : MonoBehaviour {

    void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.tag == "Hand")
        {
            ManageSequences.Instance.TransitionToGameplay();
            GetComponent<AudioSource>().Play();
        }

    }
}
