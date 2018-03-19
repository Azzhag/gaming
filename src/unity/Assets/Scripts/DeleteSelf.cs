using UnityEngine;

public class DeleteSelf : MonoBehaviour {

    public float TimeUntilDelete;

	void Start () {
        Destroy(gameObject, TimeUntilDelete);
	}
}
