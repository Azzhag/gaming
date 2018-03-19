using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MakeToxic : MonoBehaviour {

    public Transform ToxicPfx;
    [SerializeField]
    private bool _isToxic;  // must be exposed in Unity editor so that Tutorial object can be toxic at start

    public void ChangeToToxic()
    {
        if (ToxicPfx == null)
        {
            //log error
            return;
        }

        ToxicPfx.gameObject.SetActive(true);
        _isToxic = true;
    }

    public bool GetIsToxic ()
    {
        return _isToxic;
    }
}
