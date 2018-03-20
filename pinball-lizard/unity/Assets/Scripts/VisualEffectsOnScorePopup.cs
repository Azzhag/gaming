using UnityEngine;
using UnityEngine.UI;

public class VisualEffectsOnScorePopup : MonoBehaviour {

    public float MoveForward;
    public float AlphaDecay;
    public Text UiText;

	
	void Update ()
    {
        transform.Translate(Vector3.forward * MoveForward);
        if (UiText.color.a > 0)
        {
            float newAlpha = UiText.color.a - AlphaDecay;
            UiText.color = new Color(UiText.color.r, UiText.color.g, UiText.color.b, newAlpha);
        }        
	}

    public void SetScore (int numberOfBounces)
    {
        UiText.text = (numberOfBounces * 10).ToString();
        WebSocketClientSingleton.Instance.AddToPlayerScore(numberOfBounces * 10);
    }
}
