using UnityEngine;

public class MoveTankShell : MonoBehaviour {

    private Rigidbody _rigidbody;
    public float SpeedForward;
    public float SpeedTurning;
    private Vector3 _targetPosition = new Vector3();

    void Start ()
    {
        _rigidbody = GetComponent<Rigidbody>();
	}

    void FixedUpdate ()
    {
        _rigidbody.MovePosition(transform.position + transform.forward * SpeedForward);
        TurnTowardsTarget();
    }

    private void TurnTowardsTarget ()
    {
        Vector3 targetDir = _targetPosition - transform.position;
        Vector3 newDir = Vector3.RotateTowards(transform.forward, targetDir, SpeedTurning, 0.0F);
        _rigidbody.rotation = Quaternion.LookRotation(newDir);
    }

    public void SetTargetPosition(Vector3 targetPosition)
    {
        _targetPosition = targetPosition;
    }

}
