using UnityEngine;
using System.Collections.Generic;


public class MoveArachnotank : MonoBehaviour {

    private Vector3 _destination = new Vector3();
    private bool _shouldDescend;
    private bool _shouldAscend;
    private Vector3 _velocity;
    private float _moveTime = 1f;
    private Vector3 _topDestination = new Vector3();
    public Transform BulletPrefab;


	void Start () {
        _destination = transform.position; 
        _topDestination = new Vector3(transform.position.x, 300f, transform.position.z);
        transform.position = _topDestination;
    }
	
	void Update () {
        if (_shouldDescend)
            Descend();
        if (_shouldAscend)
            Ascend();
	}

    /// <summary>
    /// Called by ArachnotankManager
    /// </summary>
    public void CommandDescend ()
    {
        _shouldDescend = true;
    }

    private void Descend ()
    {
        transform.position = Vector3.SmoothDamp(transform.position, _destination, ref _velocity, _moveTime);
        if (Vector3.Distance(transform.position, _destination) < 0.5f)
        {
            _shouldDescend = false;
            Fire();
            Invoke("SetAscendTrue", 1f);
        }
    }

    private void SetAscendTrue ()
    {
        _shouldAscend = true;
    }

    void Ascend ()
    {
        transform.position = Vector3.SmoothDamp(transform.position, _topDestination, ref _velocity, _moveTime);
        if (Vector3.Distance(transform.position, _topDestination) < 0.1f)
            _shouldAscend = false;
    }

    void Fire ()
    {
        GameObject bullet = Instantiate(BulletPrefab, transform.position, transform.rotation).gameObject;
        Vector3 targetPosition = new Vector3(
            Random.Range(-10f, 10f),
            Random.Range(10f, 20f),
            0f);
        bullet.SendMessage(Constants.METHOD_SET_TARGET_POSITION, targetPosition, SendMessageOptions.DontRequireReceiver);
    }
}
