'use strict'

const c = require('../config');
const Playfab = require('playfab-sdk');
const Bottleneck = require('bottleneck');
const { minRequestDelayTime, maxOutgoingRequests } = require('../config/constant.js');

const limiter = new Bottleneck({
  maxConcurrent: maxOutgoingRequests,
  minTime: minRequestDelayTime
});

const Server = Playfab.PlayFabServer;
const Client = Playfab.PlayFabClient;

Server.settings.titleId = Client.settings.titleId = c.PLAYFAB_API_TITLE_ID;
Server.settings.developerSecretKey = Client.settings.developerSecretKey = c.PLAYFAB_API_SECRET;

const app = {};

const limit = (method, args) => {
  const wrap = limiter.wrap( promisify );
  return wrap( method, args );
}

const promisify = ( method, args ) => {
  return new Promise( (resolve, reject) => {
    method( ...args, (err, res) => {
      if( err ) reject( err );
      resolve( res );
    });
  });
}

// for future use
const log = txt => {
  console.log( txt );
  return false;
}


const getUser = username => {
  return limit( Client.LoginWithCustomID,
    [{
      CustomId:username,
      CreateAccount: true
    }]);
}

app.getUser = getUser;
app.getUID = username => {
  return getUser( username ).then( user => {
    if( user ) {
      return user.data.PlayFabId;
    } else {
      Promise.reject( user );
    }
  });
}

app.setTitleName = username => {
  username = username.substring( 0, 25 );
  return limit( Client.UpdateUserTitleDisplayName,
               [{ "DisplayName": username }] );
}

app.getAllStats = UID => {
  return limit( Server.GetPlayerStatistics,
    [{
        PlayFabId:UID
    }]
  ).then( res => {
    if( res ) {
      return Array.from( res.data.Statistics );
    } else {
      Promise.reject( 'error' );
    }
  }).then( stats => {
    let ret = {};
    for( let stat of stats ) {
      ret[stat.StatisticName] = stat.Value;
    }
    return ret;
  });
}

app.getStats = async ( UID, names ) => {
  return limit( Server.GetPlayerStatistics,
    [{
        PlayFabId:UID,
        StatisticNames:names
    }]
  ).then( res => {
    if( res ) {
      return res.data.Statistics;
    } else {
      Promise.reject( 'error' );
    }
  }).then( stats => {
    let ret = {};
    for( let stat of stats ) {
      ret[stat.StatisticName] = stat.Value;
    }
    return ret;
  });
}

app.setStats = async ( UID, stats, version=undefined ) => {
  let pfStats = [];
  for( let name in stats ) {
    pfStats.push({
      StatisticName:name,
      Version:version,
      Value:stats[name]
    });
  }
  return limit( Server.UpdatePlayerStatistics,
    [{
        PlayFabId:UID,
        Statistics:pfStats
    }]
  );
}

exports = module.exports = app;
