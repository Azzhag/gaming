public static class Constants
{
    public const string MAIN_TEXTURE = "_MainTex";

    public const string TAG_ENEMY_UNIT = "EnemyUnit";
    public const string TAG_NPC_TANK = "Arachnotank";
    public const string TAG_NPC_MISSILE = "Missile";
    public const string TAG_BUILDING = "Building";
    public const string TAG_DOODAD = "DooDad";
    public const string TAG_HAND = "Hand";
    public const string TAG_TERRAIN = "Terrain";

    public const int MSG_TYPE_PLAYER = 0;
    public const int MSG_TYPE_ENEMY = 1;
    public const int MSG_TYPE_BUILDING = 2;
    public const int MSG_TYPE_ERROR = 3;
    public const int MSG_TYPE_INIT = 4;
    public const int MSG_TYPE_DESTROY = 5;

    public const int MSG_PLAYER_CURRENT = 0;
    public const int MSG_ACTION_UPDATE_NAME = 0;
    public const int MSG_ACTION_GET_NAME = 1;
    public const int MSG_ACTION_GET_SCORE = 2;
    public const int MSG_ACTION_ADD_SCORE = 3;
    public const int MSG_ACTION_POSITION = 4;

    public const int MSG_NPC_ALL = 0;
    public const int MSG_NPC_ICE_LICE = 1;
    public const int MSG_NPC_ARAC_TANK = 2;
    public const int MSG_NPC_FIRE_FLY = 3;
    public const int MSG_NPC_FORMATION = 4;

    public const int MSG_ACTION_SPAWN = 0;
    public const int MSG_ACTION_DIE = 1;
    public const int MSG_ACTION_LIST = 2;
    public const int MSG_ACTION_STATUS = 3;
    public const int MSG_ACTION_BARRAGE = 4;
    public const int MSG_ACTION_TOXIC = 5;
    public const int MSG_ACTION_STRIKE = 6;

    public const int MSG_FORMATION_SPAWN = 0;
    public const int MSG_FORMATION_DIE = 1;
    public const int MSG_FORMATION_LIST = 2;
    public const int MSG_FORMATION_STATUS = 3;
    public const int MSG_FORMATION_SPLIT = 4;
    public const int MSG_FORMATION_MERGE = 5;
    public const int MSG_FORMATION_REFORM = 6;
    public const int MSG_FORMATION_MOVE = 7;
    public const int MSG_FORMATION_SCATTER = 8;

    public const int MSG_ACTION_INIT = 0;
    public const int MSG_ACTION_START = 1;
    public const int MSG_SPEC_ALL = 0;


    public const string METHOD_TANK_DESCEND = "CommandDescend";
    public const string METHOD_DESTROY_BLDG = "SetDestroyed";
    public const string METHOD_TUT_SETSPAWN = "SetSpawnScript";
    public const string METHOD_FORMATION_INIT = "SetFormationId";
    public const string METHOD_FORMATION_ASSIGN = "AddListOfMembers";
    public const string METHOD_FORMATION_POSITION = "SetFormationPosition";
    public const string METHOD_FORMATION_OFFSETS = "SetNewOffsets";
    public const string METHOD_SET_HOLD = "SetHoldingPoint";
    public const string METHOD_SET_FAR = "SetFarPoint";
    public const string METHOD_SET_MGR = "SetManager";
    public const string METHOD_SET_TGT = "SetPlayerTarget";
    public const string METHOD_BREAK = "BreakOff";
    public const string METHOD_LEAD = "LeadAirstrike";
    public const string METHOD_FOLLOW = "FollowLeader";
    public const string METHOD_PLAY_AUDIO = "PlayAudio";
    public const string METHOD_SET_SCORE = "SetScore";
    public const string METHOD_SET_WAYPOINT = "SetWaypoint";
    public const string METHOD_SET_FORMATION_SCRIPT = "SetFormationScript";
    public const string METHOD_MAKE_TOXIC = "ChangeToToxic";
    public const string METHOD_SCATTER = "Scatter";
    public const string METHOD_SET_TARGET_POSITION = "SetTargetPosition";
    public const string METHOD_SET_NPC_ID = "SetNpcId";
    public const string METHOD_SET_NUMBER_BOUNCES = "SetNumberOfBounces";
    public const string METHOD_END_INTRO_AUDIO = "EndIntroAudio";
    public const string METHOD_DESTROY_ENEMY = "ChangeStateToDestroyed";
}

public enum BALL_COLOR { BLUE, RED, GREEN };