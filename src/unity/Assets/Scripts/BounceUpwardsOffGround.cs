using UnityEngine;

public class BounceUpwardsOffGround : MonoBehaviour {

    private const int _VECT_MODIFIER = 500;
    private Rigidbody _rigidbody;

    void Start ()
    {
        _rigidbody = GetComponent<Rigidbody>();
	}
	
    void OnCollisionEnter (Collision collision)
    {
        if (collision.gameObject.tag == Constants.TAG_TERRAIN)
        {
            _rigidbody.AddForce(Vector3.up * _VECT_MODIFIER);
        }
    }
}
