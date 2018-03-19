using System;

[Serializable]
public class JsonForAzure
{
    public string instance;
    public Auth auth = new Auth();
    public int type;
    public int spec;
    public int action;
    public Payload payload = new Payload();
}



