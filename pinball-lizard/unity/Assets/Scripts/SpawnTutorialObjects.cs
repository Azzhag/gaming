using System.Collections;
using UnityEngine;

public class SpawnTutorialObjects : MonoBehaviour
{
    public Transform BlueBallPrefab;
    public Transform BlueBallSpawnPosition;
    public Transform BlueSpawnEffect;

    public Transform RedBallPrefab;
    public Transform RedBallSpawnPosition;
    public Transform RedSpawnEffect;

    public Transform GreenBallPrefab;
    public Transform GreenBallSpawnPosition;
    public Transform GreenSpawnEffect;

    void Start()
    {
        SpawnBall(BALL_COLOR.BLUE);
        SpawnBall(BALL_COLOR.RED);
        SpawnBall(BALL_COLOR.GREEN);
    }

    public void SpawnBall(BALL_COLOR color)
    {
        StartCoroutine(DoSpawn(color));
    }

    private IEnumerator DoSpawn (BALL_COLOR color)
    {
        Transform spawnPrefab;
        Vector3 spawnPosition;
        Transform spawnEffect;

        switch (color)
        {
            case BALL_COLOR.BLUE:
                spawnPrefab = BlueBallPrefab;
                spawnPosition = BlueBallSpawnPosition.position;
                spawnEffect = BlueSpawnEffect;
                break;
            case BALL_COLOR.RED:
                spawnPrefab = RedBallPrefab;
                spawnPosition = RedBallSpawnPosition.position;
                spawnEffect = RedSpawnEffect;
                break;
            case BALL_COLOR.GREEN:
            default:
                spawnPrefab = GreenBallPrefab;
                spawnPosition = GreenBallSpawnPosition.position;
                spawnEffect = GreenSpawnEffect;
                break;
        }

        Instantiate(spawnEffect, spawnPosition, Quaternion.identity);
        yield return new WaitForSeconds(0.5f);
        GameObject newBall = Instantiate(spawnPrefab, spawnPosition, Quaternion.identity).gameObject;
        newBall.transform.parent = this.gameObject.transform;
        newBall.SendMessage("SetSpawnScript", this, SendMessageOptions.DontRequireReceiver);
        newBall.transform.parent = this.gameObject.transform; // make balls a child of this GameObject so that all of them can be turned-off easily when we transition to gameplay
    }


}
