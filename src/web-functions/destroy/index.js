
const out = require('../common/output');
const util = require('../common/util');
const c = require('../common/constants');
const mixer = require('../common/mixer');
const playfab = require('../common/playfab');
const commanderComs = require('../common/commander-coms');

module.exports = function (context, req) {
    
    // check that session was initialized
    if( !util.checkSession( context ) ) {
        return context.done();
    }

    let instance = context.bindings.instanceIn[0];
    let code = 200;
    let msg = 'Instance Destroyed';

    if( instance.active != true ) {
        code = 401;
        msg = 'Instance Not Active'
    }

    instance.active = false;

    context.bindings.instanceOut = instance;

    const reqBody = util.parseJSON( req.body ) || util.fillReq();   
    context.res = out.compile( code, c.type.DESTROY, reqBody.spec, reqBody.action, null, reqBody,
        {
            [c.labels.MESSAGE]: msg
        });

    const instanceId = instance.instance;
    mixer.disconnect( instanceId );

    // destroy game in commander
    commanderComs.sendDestroy( instance.instance );
    commanderComs.flush( instance.instance );

    playfab.setScore( instance.instance, instance.playerScore, instance.playerName );
    playfab.flush( instance.instance );
    
    context.done();
};