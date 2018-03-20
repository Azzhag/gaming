using UnityEngine;

public class PropelForwardAfterDestruction : MonoBehaviour {

    private Rigidbody _myRigidbody;
    private const float _SPEED_FORWARD = 100.0f;

	void Start ()
    {
        _myRigidbody = GetComponent<Rigidbody>();
	}

    void FixedUpdate()
    {
        _myRigidbody.AddForce(transform.forward * _SPEED_FORWARD);
    }
}
