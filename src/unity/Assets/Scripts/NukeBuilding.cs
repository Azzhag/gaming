using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NukeBuilding : MonoBehaviour {

    public List<ShowHexDestroyed> _listOfHexes = new List<ShowHexDestroyed>();
    private int _destroyedHexesCount;
    public Transform NukeEffect;
    private bool _hasBeenNuked;


    void Start () {
		for (int i = 0; i < _listOfHexes.Count; i++)
        {
            _listOfHexes[i].SetNukeBuildingScript(this);
        }
	}
	

    public void AddDestroyedHex ()
    {
        _destroyedHexesCount++;
        if (_hasBeenNuked == false && _destroyedHexesCount > _listOfHexes.Count * 0.25f)
        {
            StartCoroutine(NukeSequence());
        }
    }

    private IEnumerator NukeSequence ()
    {
        _hasBeenNuked = true;
        Instantiate(NukeEffect, transform.position, transform.rotation);
        yield return new WaitForSeconds(2f);
        for (int i = 0; i < _listOfHexes.Count; i++)
        {
            _listOfHexes[i].gameObject.SetActive(false);
        }
    }
}
