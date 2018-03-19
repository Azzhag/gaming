using UnityEngine;

public class FireFlyManager : MonoBehaviour {

    private GameObject _firefly1;
    private GameObject _firefly2;
    public Transform HoldingPoint1;
    public Transform HoldingPoint2;
    public Transform FarPoint1;
    public Transform FarPoint2;
    public Transform FireflyPrefab;
    public Transform SpawnPoint;
    public GameObject PlayerTarget;
    
    void Start ()
    {
        SpawnFireFlies();
    }
	
    private void SpawnFireFlies()
    {
        if (_firefly1 == null)
        {
            _firefly1 = Instantiate(FireflyPrefab, SpawnPoint.position, Quaternion.identity).gameObject;
            _firefly1.GetComponent<MoveFirefly>().SetupReferences(HoldingPoint1, FarPoint1, PlayerTarget, this.gameObject);
            _firefly1.GetComponent<DestroyFireFly>().SetManager(this.gameObject);
            _firefly1.GetComponent<ShootAtPlayer>().SetPlayerTarget(PlayerTarget);
        }
        if (_firefly2 == null)
        {
            _firefly2 = Instantiate(FireflyPrefab, SpawnPoint.position, Quaternion.identity).gameObject;
            _firefly2.GetComponent<MoveFirefly>().SetupReferences(HoldingPoint2, FarPoint2, PlayerTarget, this.gameObject);
            _firefly2.GetComponent<DestroyFireFly>().SetManager(this.gameObject);
            _firefly2.GetComponent<ShootAtPlayer>().SetPlayerTarget(PlayerTarget);
        }
    }

    public void FireflyIsDestroyed (GameObject destroyedFirefly)
    {
        if (destroyedFirefly == _firefly1)
        {
            _firefly1 = null;
            _firefly2.SendMessage(Constants.METHOD_BREAK, SendMessageOptions.DontRequireReceiver);

        }
        if (destroyedFirefly == _firefly2)
        {
            _firefly2 = null;
            _firefly1.SendMessage(Constants.METHOD_BREAK, SendMessageOptions.DontRequireReceiver);
        }

        SpawnFireFlies();
    }

    public void BeginAirstrike ()
    {
        _firefly1.SendMessage(Constants.METHOD_LEAD, SendMessageOptions.DontRequireReceiver);
        _firefly2.SendMessage(Constants.METHOD_FOLLOW, _firefly1.transform, SendMessageOptions.DontRequireReceiver);
    }

    public void AirstrikeComplete ()
    {
        _firefly1.SendMessage(Constants.METHOD_BREAK, SendMessageOptions.DontRequireReceiver);
        _firefly2.SendMessage(Constants.METHOD_BREAK, SendMessageOptions.DontRequireReceiver);
    }
}
