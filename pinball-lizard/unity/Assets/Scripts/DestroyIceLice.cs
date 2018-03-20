using UnityEngine;

public class DestroyIceLice : DestroyEnemyUnit {

    public Transform _scorePopupPrefab;

    public override void ChangeStateToDestroyed(Vector3 slapVector)
    {
        transform.GetComponent<MoveIceLice>().enabled = false;

        GameObject scorePopup = Instantiate(_scorePopupPrefab, transform.position, Quaternion.identity).gameObject;
        scorePopup.SendMessage(Constants.METHOD_SET_SCORE, 1, SendMessageOptions.DontRequireReceiver);

        base.ChangeStateToDestroyed(slapVector);
    }
}
