'use strict';
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const settings = require('../../settings');
const validURI = require('valid-url')
const singlePlayerAnnouncement = require('../helpers/single-player-announcement');

let port;

const backupPresets = {};

function playURI(player, values) {
  const clipFileName = unescape(values[0]);
  var clipURI;

  let announceVolume = settings.announceVolume || 40;

  if (/^\d+$/i.test(values[values.length -1])) {
    // first parameter is volume
    announceVolume = values.pop();
  }
  clipURI = values.join('/');
  if(!validURI.isUri(clipURI))
  	clipURI = unescape(clipURI)

  return singlePlayerAnnouncement(player, `${clipURI}`, announceVolume);
}

module.exports = function (api) {
  port = api.getPort();
  api.registerAction('url', playURI);
}
