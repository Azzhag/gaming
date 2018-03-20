using UnityEngine;
using UnityEngine.SceneManagement;


public class PressStartButtonToReloadScene : MonoBehaviour {

    void OnTriggerEnter (Collider other)
    {
        if (other.gameObject.tag == Constants.TAG_HAND)
        {
            WebSocketClientSingleton.Instance.SendDestroyMessage();
            SceneManager.LoadScene(0);
        }
        
    }
}
