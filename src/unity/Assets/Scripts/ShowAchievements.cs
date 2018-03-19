using UnityEngine;
using HoloToolkit.Unity;

public class ShowAchievements : Singleton<ShowAchievements> {

    private bool _youMonsterHasBeenShown;
    private bool _pesticideHasBeenShown;
    private int _countDeadEnemies;
    private int _countDestroyedHexes;
    public GameObject YouMonsterPopup;
    public GameObject PesticidePopup;

    public void AddDeadEnemy ()
    {
        _countDeadEnemies++;
        if (_pesticideHasBeenShown == false && _countDeadEnemies > 100)
        {
            _pesticideHasBeenShown = true;
            PesticidePopup.SetActive(true);
        }
    }

    public void AddDestroyedHex ()
    {
        _countDestroyedHexes++;
        if (_youMonsterHasBeenShown == false && _countDestroyedHexes > 100)
        {
            _youMonsterHasBeenShown = true;
            YouMonsterPopup.SetActive(true);
        }
    }
}
