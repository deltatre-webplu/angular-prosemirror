'use strict';

var ProseMirror = require('../node_modules/prosemirror/dist/edit/main').ProseMirror;
require('../node_modules/prosemirror/dist/menu/tooltipmenu');
require('../node_modules/prosemirror/dist/menu/menubar');
require('../node_modules/prosemirror/dist/markdown');

(function () {

        angular.module('markdownProsemirror').directive('prosemirror', ['$parse', function ($parse) {
                return {
                        restrict: 'E',
                        require: '?ngModel',
                        link: function link(scope, element, attrs, ngModel) {

                                if (!ngModel) return; // do nothing if no ng-model

                                var place = element[0];

                                var options = {
                                        place: place,
                                        doc: '',
                                        docFormat: 'markdown'
                                };

                                var inheritedOptions = $parse(attrs.prosemirrorOptions)(scope) || {};

                                options = angular.merge(options, inheritedOptions);

                                var editor = new ProseMirror(options);

                                editor.on('change', function () {
                                        ngModel.$setViewValue(editor.getContent('markdown'), 'change');
                                });
                                editor.on('blur', function () {
                                        ngModel.$setViewValue(editor.getContent('markdown'), 'blur');
                                });

                                ngModel.$render = function () {
                                        editor.setContent(ngModel.$viewValue || '', 'markdown');
                                };
                        }

                };
        }]);
})();