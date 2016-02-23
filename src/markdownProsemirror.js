(function() {

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

  angular.module('markdownProsemirror')
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
          modelOptions: '=?ngModelOptions',
          prosemirrorOptions: '=?'
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
        template: `
          <prosemirror ng-model="ctrl.model"
            ng-model-options="ctrl.modelOptions"
            prosemirror-options="ctrl.prosemirrorOptions"
            ng-if="!showMarkdown"
            ng-change="ctrl.change()"></prosemirror>
          <textarea class="MarkDown"
            msd-elastic ng-model="ctrl.model"
            ng-model-options="ctrl.modelOptions"
            ng-if="showMarkdown"
            ng-change="ctrl.change()"></textarea>
          `
      };
    }
  ]);

})();
