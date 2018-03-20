using System.Collections;
using UnityEngine;

public class FadeScriptSimple : MonoBehaviour {

    private Material _myMaterial;
    public float Rate;

	void Start () {
        _myMaterial = GetComponent<Renderer>().material;
	}

    public void TransitionEffect()
    {
        StartCoroutine("DoTransitionEffect");
    }

    private IEnumerator DoTransitionEffect ()
    {
        for (float newValue = 0; newValue < 1; newValue += Rate)
        {
            Color fadeColor = new Color(newValue, newValue, newValue, 0f);
            _myMaterial.SetColor("_Color", fadeColor);
            yield return null;
        }
        yield return new WaitForSeconds(1f);
        for (float newValue = 1; newValue > 0; newValue -= Rate)
        {
            Color fadeColor = new Color(newValue, newValue, newValue, 0f);
            _myMaterial.SetColor("_Color", fadeColor);
            yield return null;
        }
    }
}
