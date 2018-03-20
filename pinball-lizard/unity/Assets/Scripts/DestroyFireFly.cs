using UnityEngine;

public class DestroyFireFly : DestroyEnemyUnit {

    private GameObject _manager;

    public override void ChangeStateToDestroyed(Vector3 slapVector)
    {
        GetComponent<MoveFirefly>().enabled = false;
        GetComponent<ShootAtPlayer>().enabled = false;
        GetComponent<Rigidbody>().rotation = Quaternion.LookRotation(slapVector);
        _manager.SendMessage("FireflyIsDestroyed", this.gameObject, SendMessageOptions.DontRequireReceiver);

        base.ChangeStateToDestroyed(slapVector);
    }

    public void SetManager (GameObject manager)
    {
        _manager = manager;
    }
}
