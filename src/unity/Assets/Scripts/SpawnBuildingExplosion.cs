using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnBuildingExplosion : MonoBehaviour {

    public Transform ExplosionPrefab;
    private int _numberOfBounces;
    private bool _isFirstCollision = true;

    void FixedUpdate()
    {
        // Object will collide with multiple hexes in one cycle, and that creates inaccuracy when counting bounces.
        // So we only consider the first collision of this FixedUpdate cycle, and we ignore everything after.
        // Then we reset it on each cycle.
        if (_isFirstCollision == false)
            _isFirstCollision = true;
    }

    private void OnCollisionEnter(Collision other)
    {
        if (_isFirstCollision && (other.gameObject.tag == Constants.TAG_BUILDING || other.gameObject.tag == Constants.TAG_DOODAD))
        {
            _numberOfBounces++;
            TutiPlayAudio.Instance.CueBounceAudio(_numberOfBounces);

            GameObject explosion = Instantiate(ExplosionPrefab, transform.position, Quaternion.identity).gameObject;
            explosion.SendMessage(Constants.METHOD_SET_NUMBER_BOUNCES, _numberOfBounces, SendMessageOptions.DontRequireReceiver);

            Vector3 normalVector = other.contacts[0].normal;
            GetComponent<Rigidbody>().AddForce(normalVector * 1000f);

            _isFirstCollision = false;
        }

        if (_numberOfBounces > 6)
        {
            Destroy(this.gameObject);
        }
    }
}