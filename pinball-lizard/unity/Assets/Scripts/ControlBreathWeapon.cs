using System.Collections;
using UnityEngine;
using HoloToolkit.Unity;


public class ControlBreathWeapon : Singleton<ControlBreathWeapon>
{
    private const int _MAX_BREATH_DURATION = 3;
    private bool _breathWeaponCanBeUsed;
    public GameObject BreathWeapon;
    public GameObject Gui;
    private bool _sequnceHasBegun;
    public float BreathWeaponLoudnessTrigger;
    private float _loudness;
    private bool _weaponIsActive;
    private float _startTime;


    void Update ()
    {
        _loudness = MicControlC.Instance.loudness;

        if (_loudness > BreathWeaponLoudnessTrigger && 
            _weaponIsActive == false && 
            _breathWeaponCanBeUsed)
        {
            Gui.SetActive(false);
            BreathWeapon.SetActive(true);
            _weaponIsActive = true;
            Gui.SetActive(false);
            _startTime = Time.time;
            ManageSequences.Instance.TransitionToGameplay(); // breath weapon is a trigger to begin gameplay;
        }

        if (_weaponIsActive && 
            Time.time > _startTime + _MAX_BREATH_DURATION && 
            _loudness < BreathWeaponLoudnessTrigger)
        {
            BreathWeapon.SetActive(false);
            _weaponIsActive = false;
            _breathWeaponCanBeUsed = false;
        }
    }

    public void BeginSequence ()
    {
        if (_sequnceHasBegun == false)
        {
            StartCoroutine(DoSequence());
        }
    }

    IEnumerator DoSequence ()
    {
        _sequnceHasBegun = true;
        Gui.SetActive(true);
        Gui.SendMessage(Constants.METHOD_PLAY_AUDIO, SendMessageOptions.DontRequireReceiver);
        yield return new WaitForSeconds(_MAX_BREATH_DURATION);
        _breathWeaponCanBeUsed = true;
        yield return new WaitForSeconds(_MAX_BREATH_DURATION);
        _sequnceHasBegun = false;
    }
}
