using UnityEngine;

public class MoveTuti : MonoBehaviour {

    private Vector3 _centerPoint = new Vector3(0f, 25f, 0f);
    private const float _ROT_ANGLE = 0.1f;

    void FixedUpdate ()
    {
        transform.RotateAround(_centerPoint, Vector3.up, _ROT_ANGLE);
	}
}
