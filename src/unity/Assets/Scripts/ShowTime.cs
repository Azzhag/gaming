using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ShowTime : MonoBehaviour {

    public float TimerLength;
    private float _startTime;
    private bool _timerHasStarted;
    public Text TimerText;

	
	void Update () {
        if (_timerHasStarted)
        {
            float timeRemaining = TimerLength - Time.time + _startTime;

            int minutes = Mathf.FloorToInt(timeRemaining / 60.0f);
            int seconds = Mathf.FloorToInt(timeRemaining - minutes * 60.0f);
            
            if (timeRemaining <= 0)
            {
                minutes = 0;
                seconds = 0;
            }

            string niceTime = string.Format("{0:0}:{1:00}", minutes, seconds);
            TimerText.text = niceTime;
        }
	}

    public void StartTimer()
    {
        _startTime = Time.time;
        _timerHasStarted = true;
        TimerText.gameObject.SetActive(true);
    }
}
