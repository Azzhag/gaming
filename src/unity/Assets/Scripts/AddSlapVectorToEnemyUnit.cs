using UnityEngine;


public class AddSlapVectorToEnemyUnit : MonoBehaviour {

    private Vector3 _lastPosition = new Vector3();
    private Vector3 _slapVector = new Vector3();

    void FixedUpdate ()
    {
        _slapVector = transform.position - _lastPosition;
        _lastPosition = transform.position;	
	}

    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.tag == Constants.TAG_ENEMY_UNIT)
        {
            DestroyEnemyUnit enemyDestructionScript = other.GetComponent<DestroyEnemyUnit>();
            enemyDestructionScript.ChangeStateToDestroyed(_slapVector);
        }
    }
}
