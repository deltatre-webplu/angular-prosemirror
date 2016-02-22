var ProseMirror = require("../node_modules/prosemirror/dist/edit/main").ProseMirror;
require("../node_modules/prosemirror/dist/inputrules/autoinput");
require("../node_modules/prosemirror/dist/menu/tooltipmenu");
require("../node_modules/prosemirror/dist/menu/menubar");

var pm = window.pm = new ProseMirror({
  place: document.querySelector(".full"),
  autoInput: true,
  tooltipMenu: {selectedBlockMenu: true},
  menuBar: {float: true},
  doc: document.querySelector("#content"),
  docFormat: "dom"
});

document.querySelector("#mark").addEventListener("mousedown", e => {
  pm.markRange(pm.selection.from, pm.selection.to, {className: "marked"});
  e.preventDefault();
});
