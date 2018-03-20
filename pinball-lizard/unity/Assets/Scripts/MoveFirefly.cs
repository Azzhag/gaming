using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveFirefly : MonoBehaviour {

    private Rigidbody _rigidbody;
    private Transform _destination;
    public float SpeedTurning;
    public float SpeedForward;
    private GameObject _manager;
    private GameObject _playerTarget;
    private bool _followLeader;
    private bool _isLeadingAirstrike;
    private Transform _holdingPoint;
    private Transform _farPoint;

    void Start ()
    {
        _rigidbody = GetComponent<Rigidbody>();
	}
	
    void FixedUpdate ()
    {
        TurnTowardsDestination();
        _rigidbody.MovePosition(transform.position + transform.forward * SpeedForward);

        if (_isLeadingAirstrike)
        {
            float distanceToPlayer = Vector3.Distance(transform.position, _playerTarget.transform.position);
            if (distanceToPlayer < 5)
            {
                _manager.SendMessage("AirstrikeComplete", SendMessageOptions.DontRequireReceiver);
            }
        }

        if (_destination == _farPoint)
        {
            float distanceToFarpoint = Vector3.Distance(transform.position, _destination.position);
            if (distanceToFarpoint < 2)
            {
                _destination = _holdingPoint;
            }
        }
    }

    void TurnTowardsDestination ()
    {
        Vector3 targetDir = _destination.position - transform.position;
        Vector3 newDir = Vector3.RotateTowards(transform.forward, targetDir, SpeedTurning, 0.0F);
        _rigidbody.rotation = Quaternion.LookRotation(newDir);
    }

    public void SetupReferences (Transform holdingPoint, Transform farPoint, GameObject playerTarget, GameObject manager)
    {
        _holdingPoint = holdingPoint;
        _destination = _holdingPoint;
        _farPoint = farPoint;
        _playerTarget = playerTarget;
        _manager = manager;
    }

#region Called by Firefly Manager
    public void BreakOff()
    {
        _followLeader = false;
        _isLeadingAirstrike = false;
        _destination = _farPoint;
    }

    public void LeadAirstrike()
    {
        _destination = _playerTarget.transform;
        _isLeadingAirstrike = true;
    }

    public void FollowLeader(Transform leader)
    {
        _destination = leader;
        _followLeader = true;
    }
#endregion
}
