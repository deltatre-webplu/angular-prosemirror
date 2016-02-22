var ProseMirror = require("../node_modules/prosemirror/dist/edit/main").ProseMirror;
require("../node_modules/prosemirror/dist/inputrules/autoinput");
require("../node_modules/prosemirror/dist/menu/tooltipmenu");
require("../node_modules/prosemirror/dist/menu/menubar");

var angular = require('angular');

angular.module('demo', [])
.directive('angularProsemirror', function() {
  return {
    restrict: "E",
    link: function(scope, element, attrs){
      var pm = window.pm = new ProseMirror({
        place: element[0],
        autoInput: true,
        tooltipMenu: {selectedBlockMenu: true},
        menuBar: {float: true},
        doc: "Some html content!",
        docFormat: "html"
      });
    }
  };
});
