var angular = require('angular');
require("../src/markdownProsemirror");

angular.module('demo', ['markdownProsemirror'])
  .controller('demoController', function() {

    var vm = this;
    vm.showMarkdown = true;
    vm.content = 'my **markdown** content';
  });
