using UnityEngine;

public class MoveForward : MonoBehaviour {

    public float MoveSpeed;

	void Update ()
    {
        transform.Translate(Vector3.forward * MoveSpeed, Space.Self);
	}
}
