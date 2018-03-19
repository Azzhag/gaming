using UnityEngine;

public class MoveBreathWeaponFireball : MonoBehaviour {

    public Transform Fireball;

	void Update () {
        RaycastHit raycastHit;
        if (Physics.Raycast(transform.position, -transform.up, out raycastHit, 200.0f))
        {
            Fireball.position = raycastHit.point;
        }
    }

    void OnDisable ()
    {
        Fireball.position = new Vector3(0.0f, -1000.0f, 0.0f);
    }
}
