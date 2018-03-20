using System.Collections.Generic;
using UnityEngine;
using HoloToolkit.Unity;


public class DictionaryOfIds : Singleton<DictionaryOfIds> {

    private Dictionary<string, GameObject> _dictionary = new Dictionary<string, GameObject>();

    public void AddToDictionary (string azureId, GameObject unityGameObject)
    {
        _dictionary.Add(azureId, unityGameObject);
    }

    public GameObject GetGameObject (string azureId)
    {
        GameObject value;
        _dictionary.TryGetValue(azureId, out value);
        return value;
    }

    public void RemoveFormation (string formationId)
    {
        GameObject formation = GetGameObject(formationId);
        if (formation != null)
        {
            Destroy(formation);
            _dictionary.Remove(formationId);
        }
    }

    public void DestroyAllEnemies ()
    {
        foreach (KeyValuePair<string, GameObject> kvp in _dictionary)
        {
            Destroy(kvp.Value);
        }
    }
}
