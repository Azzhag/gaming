using UnityEngine;

public class DestroyDoodads : MonoBehaviour
{
    void OnTriggerEnter(Collider other)
    {
        if (other == null || other.gameObject == null)
        {
            //log error
            return;
        }

        if (other.gameObject.tag == Constants.TAG_DOODAD)
        {
            Destroy(other.gameObject);
        }
    }
}