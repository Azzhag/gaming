using UnityEngine;

public class ShootAtPlayer : MonoBehaviour {

    public Transform BulletPrefab;
    private Transform _playerHead;
    public float MinimumDistaceToTarget;
    private float _distanceToTarget;
    private bool _isEvading;
    private float _lastFireBulletTime;
    public float Timer;
   	
	void Update () {
        _distanceToTarget = Vector3.Distance(transform.position, _playerHead.position);
        Vector3 _angleToTarget = _playerHead.position - transform.position;
        float _angleOffTarget = Vector3.Angle(transform.forward, _angleToTarget);

        if (_distanceToTarget < MinimumDistaceToTarget && 
            _angleOffTarget < 10f && 
            _isEvading == false && 
            Time.time > _lastFireBulletTime + Timer)
        {            
            Transform newBullet = Instantiate(BulletPrefab, transform.position, Quaternion.identity);

            newBullet.LookAt(_playerHead.position);
            newBullet.Rotate(transform.up * Random.Range(-3f, 3f));
            newBullet.Rotate(transform.right * Random.Range(-3f, 3f));

            _lastFireBulletTime = Time.time;
        }
	}

    public void SetEvading (bool evading)
    {
        _isEvading = evading;
    }

    public void SetPlayerTarget (GameObject playerHead)
    {
        _playerHead = playerHead.transform;
    }
}
