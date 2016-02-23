var angular = require('angular');
require("../src/markdownProsemirror");

angular.module('demo', ['markdownProsemirror'])
  .controller('demoController', function() {

    var vm = this;
    vm.showMarkdown = false;
    vm.content = 'my **markdown** content ciao';

    vm.changeList = [];

    vm.change = function(astring, avalue) {
      console.log(vm.content, astring, avalue);
      vm.changeList.push('new change');
    };

  });
