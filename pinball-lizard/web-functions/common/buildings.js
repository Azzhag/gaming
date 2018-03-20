'use strict'

const c = require('./constants');

module.exports.create = (id, instance) => {
    return {
        [c.labels.INSTANCE]: instance,
        [c.labels.BUILDING_ID] : id,
        [c.labels.BUILDING_STATUS] : c.message.BUILDING_INTACT
    }
}