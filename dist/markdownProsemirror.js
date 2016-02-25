'use strict';

(function () {

  var cssNode = null;

  function ensureCSSAdded() {
    if (!cssNode) {
      cssNode = document.createElement('style');
      cssNode.textContent = '/* Markdown Prosemirror CSS */\n      markdown-prosemirror {\n        display: flex;\n        flex-direction: column;\n      }\n\n      markdown-prosemirror prosemirror {\n        flex-grow: 1;\n      }\n\n      markdown-prosemirror .MarkDown {\n        flex-grow: 1;\n      }\n\n      markdown-prosemirror .markdown-prosemirror-toolbar {\n        display: flex;\n      }\n      .markdown-prosemirror-toolbar .filler {\n        flex-grow: 1;\n      }\n      ';
      document.head.insertBefore(cssNode, document.head.firstChild);
    }
  }

  angular.module('markdownProsemirror').directive('markdownProsemirror', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      require: '?ngModel',
      scope: {
        ngChange: '&',
        showMarkdown: '=?'
      },
      bindToController: {
        model: '=?ngModel',
        modelOptions: '=?ngModelOptions',
        prosemirrorOptions: '=?'
      },
      controller: function controller($scope) {
        ensureCSSAdded();
        var ctrl = this;
        ctrl.change = function () {
          $timeout($scope.ngChange, 0);
        };
      },
      link: function link(scope, element, attrs, ngModelCtrl) {

        element[0].addEventListener('keydown', function (e) {
          e = e || window.event;
          if (e.ctrlKey && (e.which || e.keyCode) === 77) {
            scope.showMarkdown = !scope.showMarkdown;
            ngModelCtrl.$commitViewValue();
            scope.$apply();
          }
        });
      },
      controllerAs: 'ctrl',
      template: '\n          <prosemirror ng-model="ctrl.model"\n            ng-model-options="ctrl.modelOptions"\n            prosemirror-options="ctrl.prosemirrorOptions"\n            ng-if="!showMarkdown"\n            ng-change="ctrl.change()"></prosemirror>\n          <textarea class="MarkDown"\n            msd-elastic ng-model="ctrl.model"\n            ng-model-options="ctrl.modelOptions"\n            ng-if="showMarkdown"\n            ng-change="ctrl.change()"></textarea>\n          '
    };
  }]);
})();