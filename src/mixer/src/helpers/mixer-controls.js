'use strict'

const c = require('../config/constant');
const controls = {};
controls.types = {};

controls.types.atomicButton = cooldown => {
  const button = {
    cooldown,
    "kind": "button",
    "controlID": c.MIXER_CONTROL_ID_ATOMIC,
    "position": getGridPlacement(),
    "text": c.MIXER_BUTTON_LABEL_ATOMIC,
    "cost": 0,
    "textSize": "16",
    "textColor": "#00ffff",
    "accentColor": "#66ff00",
    "borderColor": "#003399",
    "focusColor": "#66ff00",
    "backgroundColor": "#114477"
  }
  return [ button ];
}

const getGridPlacement = (w = 20, h = 4) => {
    return [
        {
            size: 'large',
            width: w,
            height: h,
            x: 31,
            y: 9
        },
        {
            size: 'medium',
            width: w,
            height: h,
            x: 12,
            y: 10
        },
        {
            size: 'small',
            width: w * 2,
            height: h * 3,
            x: -5,
            y: 15
        },
    ];
}

module.exports = controls;
