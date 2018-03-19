using UnityEngine;

public class BreathWeaponTriggersBuildingDestruction : MonoBehaviour
{

    void OnTriggerEnter(Collider other)
    {
        if (other == null || other.gameObject == null)
        {
            //log error
            return;
        }

        var tag = other.gameObject.tag;
        switch (tag)
        {
            case Constants.TAG_ENEMY_UNIT:
                Vector3 slapVector = Random.insideUnitSphere * 10;
                other.gameObject.SendMessage(Constants.METHOD_DESTROY_ENEMY, slapVector, SendMessageOptions.DontRequireReceiver);
                break;
            case Constants.TAG_BUILDING:
                other.gameObject.SendMessage(Constants.METHOD_DESTROY_BLDG, 1, SendMessageOptions.DontRequireReceiver);
                break;
            case Constants.TAG_DOODAD:
                Destroy(other.gameObject);
                break;
            default:
                //log error
                break;
        }
    }
}