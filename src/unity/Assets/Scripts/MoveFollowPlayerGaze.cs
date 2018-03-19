using UnityEngine;

public class MoveFollowPlayerGaze : MonoBehaviour {

    public Transform Destination;
    private Vector3 _velocity = Vector3.zero;
    public Transform PlayerCamera;
    public float SmoothTime;
    private const int _DIST_TOPLAYER = 2;

    void Update ()
    {
        float distanceToDestination = Vector3.Distance(transform.position, Destination.position);
        if (distanceToDestination > _DIST_TOPLAYER)
        {
            transform.position = Vector3.SmoothDamp(transform.position, Destination.position, ref _velocity, SmoothTime);
            transform.LookAt(PlayerCamera);
        }
    }
}
