using UnityEngine;


public class DestroyHexagon : MonoBehaviour {

    private int _numberOfBounces;

    public void SetNumberOfBounces(int numberOfBounces)
    {
        _numberOfBounces = numberOfBounces;

        float newScale;
        if (_numberOfBounces > 1)
        {
            newScale = 1 + (numberOfBounces / 3);
        }
        else
        {
            newScale = 1;
        }

        transform.localScale = new Vector3(newScale, newScale, newScale);
    }


    private void OnTriggerEnter (Collider other)
    {
        if (other.gameObject.tag == Constants.TAG_BUILDING)
        {
            other.gameObject.SendMessage(Constants.METHOD_DESTROY_BLDG, _numberOfBounces, SendMessageOptions.DontRequireReceiver);
        }

        if (other.gameObject.tag == Constants.TAG_DOODAD)
        {
            Destroy(other.gameObject);
        }
    }
}
