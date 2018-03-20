using System.Collections.Generic;
using UnityEngine;

public class ShowHexDestroyed : MonoBehaviour {

    private bool _isDestroyed;
    public Transform ScorePopupPrefab;
    private Material _myMaterial;
    private float _nextPulseTime;
    public List<Texture> ListBrokenTextures = new List<Texture>();
    private NukeBuilding _nukeBuildingScript;

    void Start ()
    {
        _myMaterial = GetComponent<Renderer>().material;
    }
	
	void Update ()
    {
        if (_isDestroyed)
        {
            FlickerEmission();
        }
    }

    public void SetNukeBuildingScript (NukeBuilding nukeBuildingScript)
    {
        _nukeBuildingScript = nukeBuildingScript;
    }

    public void SetDestroyed (int numberOfBounces)
    {
        if (_isDestroyed == false)
        {
            _isDestroyed = true;

            _myMaterial.SetTexture("_EmissionMap", ListBrokenTextures[Random.Range(0, ListBrokenTextures.Count)]);
            _myMaterial.SetColor("_EmissionColor", Color.black);

            _myMaterial.SetFloat("_BumpScale", 0.2f);
            _myMaterial.SetTextureOffset("_MainTex", new Vector2(Random.Range(-5f, 5f), Random.Range(-5f, 5f)));

            GameObject scorePopup = Instantiate(ScorePopupPrefab, transform.position, Quaternion.identity).gameObject;
            scorePopup.SendMessage(Constants.METHOD_SET_SCORE, numberOfBounces, SendMessageOptions.DontRequireReceiver);
            
            if (_nukeBuildingScript)
            {
                _nukeBuildingScript.AddDestroyedHex();
            }

            ShowAchievements.Instance.AddDestroyedHex();
        }
    }

    private void FlickerEmission ()
    {
        if (Time.time > _nextPulseTime)
        {
            
            Color randomColor = new Color(Random.Range(0.05f, 0.8f), 0f, 0f);
            _myMaterial.SetColor("_EmissionColor", randomColor);
            _nextPulseTime = Time.time + Random.Range(0f, 10f);
        }

        if (_myMaterial.color.r > 0)
        {
            Color darker = new Color(_myMaterial.GetColor("_EmissionColor").r - 0.01f, 0f, 0f);
            _myMaterial.SetColor("_EmissionColor", darker);
        }
    }
}
