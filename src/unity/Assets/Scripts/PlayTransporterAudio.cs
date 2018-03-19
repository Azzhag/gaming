using UnityEngine;
using System.Collections;

public class PlayTransporterAudio : MonoBehaviour {

    public AudioClip Clip1;
    public AudioClip Clip2;

    public void PlayAudio ()
    {
        StartCoroutine("DoPlayAudio");
    }

    private IEnumerator DoPlayAudio()
    {
        GetComponent<AudioSource>().PlayOneShot(Clip1);
        yield return new WaitForSeconds(2.8f);
        GetComponent<AudioSource>().PlayOneShot(Clip2);
    }


}
