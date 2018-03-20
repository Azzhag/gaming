using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using HoloToolkit.Unity; //for Singleton


public class TutiPlayAudio : Singleton<TutiPlayAudio> {

    public List<AudioClip> ListIntro = new List<AudioClip>();
    public List<AudioClip> ListYouSuck = new List<AudioClip>();
    public List<AudioClip> ListGoodJob = new List<AudioClip>();
    public List<AudioClip> ListGreatJob = new List<AudioClip>();
    private AudioSource _audioSource;
    private float _lastCueTime;
    private float _playBounceAudioTime;
    private int _highestNumberOfBounces;
    public GameObject AnimatedMouth;


	void Start () {
        _audioSource = GetComponent<AudioSource>();
        StartCoroutine("DoIntroAudio");
    }
	
	void Update () {
        if (_highestNumberOfBounces > 0 && Time.time > _playBounceAudioTime)
            PlayCuedBounceAudio();

        if (AnimatedMouth.activeSelf && _audioSource.isPlaying == false)
        {
            AnimatedMouth.SetActive(false);
        } else if (AnimatedMouth.activeSelf == false && _audioSource.isPlaying == true)
        {
            AnimatedMouth.SetActive(true);
        }
    }

    public void EndIntroAudio ()
    {
        StopAllCoroutines();
    }

    private IEnumerator DoIntroAudio ()
    {
        for (int i = 0; i < ListIntro.Count; i++)
        {
            _audioSource.PlayOneShot(ListIntro[i]);
            yield return new WaitForSeconds(10);
            if (i == ListIntro.Count -1)
                i = -1;
        }
    }

    public void CueBounceAudio (int numberOfBounces)
    {
        // if it's a "Great" throw, play that audio immediately (if no other audio is currently being played)
        if (numberOfBounces >= 5)
        {
            if (_audioSource.isPlaying == false)
            {
                if (ListGreatJob.Count > 0)
                {
                    int randomClip = Random.Range(0, ListGreatJob.Count);
                    _audioSource.clip = ListGreatJob[randomClip];
                    _audioSource.Play();
                    ListGreatJob.RemoveAt(randomClip);
                } 
            }
        }
        else
        {
            _playBounceAudioTime = Time.time + 1f;
            if (_highestNumberOfBounces < numberOfBounces)
                _highestNumberOfBounces = numberOfBounces;
        }
    }

    private void PlayCuedBounceAudio ()
    {
        int randomChance = Random.Range(0, 100);
        if (randomChance > 50)
        {
            if (_audioSource.isPlaying == false)
            {
                if (_highestNumberOfBounces > 2)
                {
                    if (ListGoodJob.Count > 0)
                    {
                        int randomClip = Random.Range(0, ListGoodJob.Count);
                        _audioSource.clip = ListGoodJob[randomClip];
                        _audioSource.Play();
                        ListGoodJob.RemoveAt(randomClip);
                    }
                }
                else
                {
                    if (ListYouSuck.Count > 0)
                    {
                        int randomClip = Random.Range(0, ListYouSuck.Count);
                        _audioSource.clip = ListYouSuck[randomClip];
                        _audioSource.Play();
                        ListYouSuck.RemoveAt(randomClip);
                    }
                }
            }
        }
        _highestNumberOfBounces = 0;
    }
}
