using System.Collections;
using UnityEngine;
using HoloToolkit.Unity;
using UnityEngine.SceneManagement;

public class ManageSequences : Singleton<ManageSequences>
{
    private bool _transitionToGameplayHasBegun;
    public GameObject TutorialObjects;
    public GameObject WarpEffect;
    public GameObject FireflyManager;
    public GameObject Timer;
    public SendPlayerPositionData PlayerPositionScript;
    public FadeScriptSimple FadeScript;
    public GameObject StartButton;
    public GameObject RestartButton;
    public GameObject UiScreens;
    public GameObject GameLogo;
    public GameObject ScoreInside;
    public GameObject Tuti;

    public void TransitionToGameplay()
    {
        if (_transitionToGameplayHasBegun == false)
        {
            StartCoroutine(DoTransitionToGameplay());
        }
    }

    private IEnumerator DoTransitionToGameplay()
    {
        _transitionToGameplayHasBegun = true;
        Tuti.SendMessage(Constants.METHOD_END_INTRO_AUDIO, SendMessageOptions.DontRequireReceiver);
        WarpEffect.SetActive(true);
        WarpEffect.SendMessage(Constants.METHOD_PLAY_AUDIO, SendMessageOptions.DontRequireReceiver);
        yield return new WaitForSeconds(2f);
        FadeScript.TransitionEffect();
        yield return new WaitForSeconds(1f);
        StartButton.SetActive(false);
        TutorialObjects.SetActive(false);
        GetComponent<AudioSource>().Play();
        FireflyManager.SetActive(true);
        Timer.SetActive(true);
        Timer.GetComponent<ShowTime>().StartTimer();
        PlayerPositionScript.enabled = true;
        GameLogo.SetActive(false);
        ScoreInside.SetActive(true);
        WebSocketClientSingleton.Instance.SendStartMessage();

        yield return new WaitForSeconds(120f);
        
        WarpEffect.SetActive(false);
        WarpEffect.SetActive(true);
        WarpEffect.SendMessage(Constants.METHOD_PLAY_AUDIO, SendMessageOptions.DontRequireReceiver);
        yield return new WaitForSeconds(2f);
        FadeScript.TransitionEffect();
        yield return new WaitForSeconds(1f);
        Timer.SetActive(false);        
        TutorialObjects.SetActive(true);
        RestartButton.SetActive(true);
        UiScreens.SetActive(false);
        WebSocketClientSingleton.Instance.SendDestroyMessage();
        DictionaryOfIds.Instance.DestroyAllEnemies();

        yield return new WaitForSeconds(30f);

        SceneManager.LoadScene(0);
    }
}
