'use strict'

const Playfab = require('../helpers/playfab-utility');

const createUserName = (username, uuid) => {
  const parts = uuid.split('-');
  return username == parts[0] ? uuid : `${username}_${uuid}`;
}

const createShortUsername = username => {
  const parts = username.split('-');
  return parts[0];
}

exports = module.exports = async (req, res, next) => {
  if( !req.body.username || !req.body.instance ) {
    res.sendStatus(400);
    return;
  }
  let uniqueUserName = createUserName( req.body.username, req.body.instance );
  req.body.username = req.username = uniqueUserName;
  req.shortUsername = createShortUsername( uniqueUserName );
  try {
    req.uid = await Playfab.getUID( uniqueUserName );
  } catch( err ) {
    res.sendStatus( 500 );
    return;
  }
  next();
}
