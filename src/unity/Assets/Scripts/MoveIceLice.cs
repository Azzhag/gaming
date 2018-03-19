using System.Collections.Generic;
using UnityEngine;

public class MoveIceLice : MonoBehaviour
{
    public float SpeedTurning;
    private Rigidbody _rigidbody;
    public List<AudioClip> ListMoveSounds = new List<AudioClip>();
    private Vector3 _assignedWaypoint;
    private const float _SPEED = 0.03f;

    void Start()
    {
        _rigidbody = GetComponent<Rigidbody>();
        AudioSource myAudioSource = GetComponent<AudioSource>();
        myAudioSource.clip = ListMoveSounds[Random.Range(0, ListMoveSounds.Count)];
        myAudioSource.Play();
    }

    void FixedUpdate()
    {
        SmoothRotate(_assignedWaypoint);
        MoveToAssignedPosition();
    }

    private void SmoothRotate(Vector3 lookTarget)
    {
        Vector3 targetDir = lookTarget - transform.position;
        float step = SpeedTurning * Time.deltaTime;
        Vector3 newDir = Vector3.RotateTowards(transform.forward, targetDir, step, 0.0F);
        _rigidbody.rotation = Quaternion.LookRotation(newDir);
    }

    private void MoveToAssignedPosition()
    {
        float distanceFromAssignedPosition = Vector3.Distance(transform.position, _assignedWaypoint);
        float actualSpeed;
        if (distanceFromAssignedPosition < 20)
        {
            actualSpeed = distanceFromAssignedPosition * _SPEED;
            if (actualSpeed < 0.01f)
            {
                actualSpeed = 0.05f;
            }
        }
        else
        {
            actualSpeed = 1f;
        }

        _rigidbody.MovePosition(transform.position + transform.forward * actualSpeed);
    }

    public void SetWaypoint(Vector3 waypoint)
    {
        _assignedWaypoint = waypoint;
    }
}
