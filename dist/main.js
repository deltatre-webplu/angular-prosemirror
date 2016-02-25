'use strict';

var angular = require('angular');
require('angular-elastic');

angular.module('markdownProsemirror', ['monospaced.elastic']);

require('./prosemirror.js');
require('./markdownProsemirror.js');