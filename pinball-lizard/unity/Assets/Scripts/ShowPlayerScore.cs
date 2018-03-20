using UnityEngine;
using UnityEngine.UI;

public class ShowPlayerScore : MonoBehaviour {

    private Text _scoreText;

    void Start ()
    {
        _scoreText = GetComponent<Text>();
	}
	
	void Update ()
    {
        _scoreText.text = ScoreSingleton.Instance.GetPlayerScore().ToString("N0");
	}
}
