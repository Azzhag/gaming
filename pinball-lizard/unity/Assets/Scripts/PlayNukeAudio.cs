using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayNukeAudio : MonoBehaviour {

    private AudioSource _audioSource;
    public AudioClip Audio1;
    public AudioClip Audio2;
    private const float _PAUSE_TIME = 1.5f;

    void Start ()
    {
        StartCoroutine("DoPlayAudio");        
	}

    private IEnumerator DoPlayAudio ()
    {
        _audioSource = GetComponent<AudioSource>();
        _audioSource.PlayOneShot(Audio1);
        yield return new WaitForSeconds(_PAUSE_TIME);
        _audioSource.PlayOneShot(Audio2);
    }
}
