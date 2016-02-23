var ProseMirror = require('../node_modules/prosemirror/dist/edit/main').ProseMirror;
var elt = require('../node_modules/prosemirror/dist/dom').elt;
require('../node_modules/prosemirror/dist/menu/tooltipmenu');
require('../node_modules/prosemirror/dist/menu/menubar');
require('../node_modules/prosemirror/dist/markdown');

var angular = require('angular');
require('angular-elastic');

var cssNode = null;

function ensureCSSAdded() {
  if (!cssNode) {
    cssNode = document.createElement('style');
    cssNode.textContent = `/* Markdown Prosemirror CSS */
    markdown-prosemirror {
      display: flex;
      flex-direction: column;
    }

    markdown-prosemirror prosemirror {
      flex-grow: 1;
    }

    markdown-prosemirror .MarkDown {
      flex-grow: 1;
    }

    markdown-prosemirror .markdown-prosemirror-toolbar {
      display: flex;
    }
    .markdown-prosemirror-toolbar .filler {
      flex-grow: 1;
    }
    `;
    document.head.insertBefore(cssNode, document.head.firstChild);
  }
}

angular.module('markdownProsemirror', ['monospaced.elastic'])

.directive('markdownProsemirror', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'E',
      require: '?ngModel',
      scope: {
        ngChange: '&',
        showMarkdown: '=?'
      },
      bindToController: {
        model: '=?ngModel',
        modelOptions: '=?ngModelOptions'
      },
      controller: function($scope) {
        ensureCSSAdded();
        var ctrl = this;
        ctrl.change = function() {
          $timeout($scope.ngChange, 0);
        };
      },
      link: function(scope, element, attrs, ngModelCtrl) {

        element[0].addEventListener('keydown', function(e) {
          e = e || window.event;
          if(e.ctrlKey && (e.which || e.keyCode) === 77) {
            scope.showMarkdown = !scope.showMarkdown;
            ngModelCtrl.$commitViewValue();
            scope.$apply();
          }
        });

      },
      controllerAs: 'ctrl',
      template: `<prosemirror ng-model="ctrl.model" ng-model-options="ctrl.modelOptions" ng-if="!showMarkdown" ng-change="ctrl.change()"></prosemirror>
      <textarea class="MarkDown" msd-elastic ng-model="ctrl.model" ng-model-options="ctrl.modelOptions" ng-if="showMarkdown" ng-change="ctrl.change()"></textarea>`
    };
  }
])

.directive('prosemirror', function() {
  return {
    restrict: 'E',
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
        docFormat: 'markdown'
      });

      editor.on('change', function() {
        ngModel.$setViewValue(editor.getContent('markdown'), 'change');
      });
      editor.on('blur', function() {
        ngModel.$setViewValue(editor.getContent('markdown'), 'blur');
      });

      ngModel.$render = function() {
        editor.setContent(ngModel.$viewValue || '', 'markdown');
      };

    }

  };
});
