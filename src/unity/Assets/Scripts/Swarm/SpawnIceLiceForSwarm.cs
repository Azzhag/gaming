using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnIceLiceForSwarm : MonoBehaviour {

    public Transform IceLicePrefab;
    public GameObject WarpEffect;

    public void SpawnEnemiesForFormation (string formationId, List<string> listOfNewSpawnIds)
    {
        WarpEffect.SetActive(true);
        StartCoroutine(DoSpawnEnemies(formationId, listOfNewSpawnIds));
    }

    private IEnumerator DoSpawnEnemies (string formationId, List<string> listOfNewSpawnIds)
    {
        yield return new WaitForSeconds(2f);
        Formation formationScript = DictionaryOfIds.Instance.GetGameObject(formationId).GetComponent<Formation>();
        for (int i = 0; i < listOfNewSpawnIds.Count; i++)
        {
            SpawnOneIceLice(listOfNewSpawnIds[i], formationScript);
        }
        yield return new WaitForSeconds(3f);
        WarpEffect.SetActive(false);
    }

    private void SpawnOneIceLice(string npcId, Formation formationScript)
    {
        GameObject newSpawn = Instantiate(IceLicePrefab, transform.position, Quaternion.identity).gameObject;
        newSpawn.SendMessage(Constants.METHOD_SET_NPC_ID, npcId, SendMessageOptions.DontRequireReceiver);
        newSpawn.SendMessage(Constants.METHOD_SET_FORMATION_SCRIPT, formationScript, SendMessageOptions.DontRequireReceiver);
        formationScript.AddMember(newSpawn);
    }
    
}
