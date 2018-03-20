using UnityEngine;

public class SendPlayerPositionData : MonoBehaviour {

    private float _lastMessageTime;
    private const float _TIME_MSGOFFSET = 1.0f;

    void Update ()
    {
        if (Time.time > _lastMessageTime + _TIME_MSGOFFSET)
        {
            _lastMessageTime = Time.time;
            WebSocketClientSingleton.Instance.SendPlayerPositionMessage(transform.position);
        }
    }
}
