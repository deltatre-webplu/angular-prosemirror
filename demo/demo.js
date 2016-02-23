var angular = require('angular');
require("../src/markdownProsemirror");

angular.module('demo', ['markdownProsemirror'])
  .controller('demoController', function() {

    var vm = this;
    vm.showMarkdown = false;
    vm.content = 'my **markdown** content ciao';

    vm.changeList = [];

    vm.change = function() {
      vm.changeList.push('new change: ' + vm.content);
    };

  });
