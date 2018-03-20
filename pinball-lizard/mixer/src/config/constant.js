'use strict'

const c = {};

c.MIXER_TYPE_METHOD = 'method';
c.MIXER_METHOD_TYPE_JOIN = 'onParticipantJoin';
c.MIXER_METHOD_TYPE_LEAVE = 'onParticipantLeave';
c.MIXER_METHOD_TYPE_READY = 'onReady';
c.MIXER_METHOD_TYPE_INPUT = 'giveInput';
c.MIXER_METHOD_TYPE_REPLY = 'reply';

c.MIXER_METHOD_VALIDATE_READY = 'ready';

c.MIXER_DATA_PARAMS = 'params';

c.MIXER_PARAMS_PARTICIPANTID = 'participantID';

c.MIXER_PARAMS_EVENT = 'event';
c.MIXER_PARAMS_EVENT_MOUSE_UP = 'mouseup';
c.MIXER_PARAMS_EVENT_MOUSE_DOWN = 'mousedown';

c.MIXER_PARAMS_BUTTON = 'button';

c.MIXER_CONTROL_ATOMIC_COLOR = 'Atomic';
c.MIXER_CONTROL_ID_ATOMIC = 'AtomicButton';
c.MIXER_BUTTON_LABEL_ATOMIC = 'Make a bug radioactive!';

c.COOLDOWN_TIME = 20000;
c.TIMEOUT_TIME = 240000;

exports = module.exports = c;
