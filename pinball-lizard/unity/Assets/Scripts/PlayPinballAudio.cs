using System.Collections.Generic;
using UnityEngine;

public class PlayPinballAudio : MonoBehaviour {

    public List<AudioClip> ListPinballAudio = new List<AudioClip>();

    public void SetNumberOfBounces (int numberOfBounces)
    {
        GetComponent<AudioSource>().PlayOneShot(ListPinballAudio[numberOfBounces]);
    }
}
