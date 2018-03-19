using System.Collections.Generic;
using UnityEngine;

public class DestroyEnemyUnit : MonoBehaviour {

    protected bool _isDestroyed;
    protected AudioSource _audioSource;
    private string _npcId;
    private Formation _formationScript;
    public Transform DestructionEffect;
    public GameObject GrabPfx;
    public List<AudioClip> ListDeathSounds = new List<AudioClip>();
    public Animator MyAnimator;

    private void Start()
    {
        _audioSource = GetComponent<AudioSource>();
    }

    public virtual void ChangeStateToDestroyed(Vector3 slapVector)
    {
        Invoke("RemoveFromGame", 5);

        _isDestroyed = true;
        Rigidbody myRigidbody = GetComponent<Rigidbody>();
        myRigidbody.interpolation = RigidbodyInterpolation.None;
        if (slapVector != Vector3.zero)                                                             
        {                                                                                           
            myRigidbody.isKinematic = false;
            myRigidbody.useGravity = true;
            myRigidbody.velocity = slapVector * 100;
            transform.GetComponent<TrailRenderer>().enabled = true;
        }
        GrabPfx.SetActive(true);
        if (slapVector != Vector3.zero)
        {
            GrabPfx.transform.parent = null;
            Destroy(GrabPfx, 4);
        }
 
        _audioSource.Stop();
        _audioSource.volume = 1;
        _audioSource.PlayOneShot(ListDeathSounds[Random.Range(0, ListDeathSounds.Count)]);
        MyAnimator.speed = 0;                                                                      
                                                                                                    
        if (_formationScript != null)
            _formationScript.RemoveDestroyedMember(this.gameObject, _npcId);                        

        ShowAchievements.Instance.AddDeadEnemy();
    }

    public virtual void RemoveFromGame ()
    {
        Instantiate(DestructionEffect, transform.position, transform.rotation);
        Destroy(gameObject);
    }


    public virtual void SetNpcId(string idFromAzure)
    {
        _npcId = idFromAzure;
        DictionaryOfIds.Instance.AddToDictionary(_npcId, this.gameObject);
    }

    public virtual void SetFormationScript(Formation formation)
    {
        _formationScript = formation;
    }
}
