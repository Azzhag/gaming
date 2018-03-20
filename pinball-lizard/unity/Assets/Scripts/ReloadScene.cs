using UnityEngine;
using UnityEngine.SceneManagement;

public class ReloadScene : MonoBehaviour {


	void Update ()
    {
        if (Input.GetKeyDown("space"))
        {
            WebSocketClientSingleton.Instance.SendDestroyMessage();
            SceneManager.LoadScene(0);
        }
    }
}
