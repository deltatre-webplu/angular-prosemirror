# proNg-mirror

An angular.js wrapper for [ProseMirror](http://prosemirror.net/). 

## Demo

[Demo website](http://deltatre-webplu.github.io/proNg-mirror/)

## Usage

You can install it via bower or npm and use it with the `prosemirror` directive:

    <prosemirror ng-model="ctrl.content"></prosemirror>
    
or

    <markdown-prosemirror ng-model="ctrl.content"></markdown-prosemirror>

`markdown-prosemirror` contains the Prosemirror editor plus a text area for direct markdown editing.
Currently the model must be a markdown content.

### Bower

    bower install proNg-mirror
    
Use it with

    <!doctype html>
    <meta charset="utf-8" />
    <title>Markdown-ProseMirror demo page</title>
    <h1>Markdown-ProseMirror demo page</h1>
    <div ng-app="demo">
      <div ng-controller="demoController as ctrl">
        <prosemirror ng-model="ctrl.content"></prosemirror>
        <pre>{{ctrl.content}}</pre>
      </div>
    </div>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
    <script type="text/javascript" src="/dist/markdownProsemirror_bundle.js"></script>
    <script type="text/javascript">
    angular.module('demo', ['markdownProsemirror'])
      .controller('demoController', function() {
        var vm = this;
        vm.content = 'my **markdown** content';
      });
    </script>

### Npm

    npm install proNg-mirror
    
And the require it using:

    require("proNg-mirror");


## Develop

Install dependencies

    npm install
  
Compile and watch for changes on source and demo files

    npm run build-demo
  
Run the demo http server

    npm run run demo
  
