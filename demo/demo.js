var angular = require('angular');
require("../src/main");

angular.module('demo', ['markdownProsemirror'])
  .controller('demoController', function() {

    var vm = this;
    vm.showMarkdown = false;
    vm.content = 'my **markdown** content ciao';
    vm.options = {
      tooltipMenu: {
        selectedBlockMenu: true
      },
      menuBar: {
        float: true
      }
    };
    
    vm.changeList = [];

    vm.change = function() {
      vm.changeList.push('new change: ' + vm.content);
    };

  });
