using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Play321Audio : MonoBehaviour {

	void Start () {
        PlayAudio();
	}
	
    public void PlayAudio ()
    {
        StartCoroutine("DoPlayAudio");
    }

    IEnumerator DoPlayAudio ()
    {
        yield return new WaitForSeconds(1);
        GetComponent<AudioSource>().Play();
    }
}
