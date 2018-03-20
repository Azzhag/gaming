using HoloToolkit.Unity;

public class ScoreSingleton : Singleton<ScoreSingleton> {

    private int _playerScore = 0;

    /// <summary>
    /// Called by ShowPlayerScore.cs on the Jumbotron/Canvas/Text
    /// </summary>
    public int GetPlayerScore ()
    {
        return _playerScore;
    }

    /// <summary>
    /// Called by UnpackReceivedJson singleton
    /// </summary>
    public void SetPlayerScore (int scoreFromAzure)
    {
        _playerScore = scoreFromAzure;
    }
}
