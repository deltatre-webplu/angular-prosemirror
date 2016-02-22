var angular = require('angular');
require("../src/markdownProsemirror");

angular.module('demo', ['markdownProsemirror'])
  .controller('demoController', function() {

    var vm = this;
    vm.showMarkdown = false;
    vm.content = 'my **markdown** content';
  });
