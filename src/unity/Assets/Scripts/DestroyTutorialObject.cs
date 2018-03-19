using UnityEngine;

public class DestroyTutorialObject : DestroyEnemyUnit
{
    private Vector3 _startPosition;
    private SpawnTutorialObjects _spawnScript;
    public BALL_COLOR MyColor;

	void Start ()
    {
        _startPosition = transform.position;
	}
	
    public override void ChangeStateToDestroyed(Vector3 slapVector)
    {
        if (_isDestroyed == false)
        {
            _isDestroyed = true;

            Rigidbody myRigidbody = GetComponent<Rigidbody>();
            myRigidbody.interpolation = RigidbodyInterpolation.None;
            if (slapVector != Vector3.zero)
            {
                myRigidbody.isKinematic = false;
                myRigidbody.useGravity = true;
                myRigidbody.velocity = slapVector * 100;
            }

            transform.GetComponent<TrailRenderer>().enabled = true;
            GrabPfx.SetActive(true);
            Invoke("RespawnSelf", 3f);
        }
    }

    private void RespawnSelf ()
    {
        _spawnScript.SpawnBall(MyColor);
    }

    public void SetSpawnScript (SpawnTutorialObjects spawnScript)
    {
        _spawnScript = spawnScript;
    }
}
