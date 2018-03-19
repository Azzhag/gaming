using UnityEngine;

public class DestroyTankShell : DestroyEnemyUnit
{
    private void Start()
    {
        Invoke("RemoveFromGame", 9);
    }

    public override void ChangeStateToDestroyed(Vector3 slapVector)
    {
        _isDestroyed = true;
        Rigidbody myRigidbody = GetComponent<Rigidbody>();
        myRigidbody.interpolation = RigidbodyInterpolation.None;
        myRigidbody.isKinematic = false;
        myRigidbody.useGravity = true;
        myRigidbody.velocity = slapVector * 100;
        myRigidbody.rotation = Quaternion.LookRotation(slapVector);
        transform.GetComponent<MoveTankShell>().enabled = false;
        transform.GetComponent<TrailRenderer>().enabled = true;
        Destroy(gameObject, 5);
    }
}