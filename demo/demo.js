var ProseMirror = require("../node_modules/prosemirror/dist/edit/main").ProseMirror;
var elt = require("../node_modules/prosemirror/dist/dom").elt;
require("../node_modules/prosemirror/dist/menu/tooltipmenu");
require("../node_modules/prosemirror/dist/menu/menubar");
require("../node_modules/prosemirror/dist/markdown");

var angular = require('angular');
require("angular-elastic");

angular.module('demo', ['monospaced.elastic'])
  .controller('demoController', function() {

    var vm = this;
    vm.showMarkdown = false;
    vm.content = 'my **markdown** content';

  })
  .directive('markdownProsemirror', function() {
    return {
      restrict: "E",
      require: '?ngModel',
      scope: {},
      bindToController: {
        showMarkdown: '=?',
        model: '=?ngModel',
        modelOptions: '=?ngModelOptions'
      },
      controller: function() {},
      controllerAs: 'ctrl',
      template: `<button ng-click="ctrl.showMarkdown=!ctrl.showMarkdown">idiotic button</button>
      <prosemirror ng-model="ctrl.model" ng-model-options="ctrl.modelOptions" ng-if="!ctrl.showMarkdown"></prosemirror>
      <textarea class="MarkDown" msd-elastic ng-model="ctrl.model" ng-model-options="ctrl.modelOptions" ng-if="ctrl.showMarkdown"></textarea>`
    };
  })
  .directive("prosemirror", function() {
    return {
      restrict: "E",
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {

        if (!ngModel) return; // do nothing if no ng-model

        var place = element[0];
        var editor = new ProseMirror({
          place: place,
          tooltipMenu: {
            selectedBlockMenu: true
          },
          menuBar: {
            float: true
          },
          doc: '',
          docFormat: "markdown"
        });

        editor.on("change", function() {
          ngModel.$setViewValue(editor.getContent("markdown"), "change");
        });
        editor.on("blur", function() {
          ngModel.$setViewValue(editor.getContent("markdown"), "blur");
        });

        ngModel.$render = function() {
          editor.setContent(ngModel.$viewValue, 'markdown');
        };

      }

    };
  });
