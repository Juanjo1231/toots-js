(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var toast = require('./tts_modules/toast/');
var Loader = require('./tts_modules/loader/');
var customAlert = require('./tts_modules/customAlert/');
var TSwitch = require('./tts_modules/switch/');
var Pagination = require('./tts_modules/pagination/');
var color = require('./tts_modules/codeColor');
var resize = require('./tts_modules/box_resize');

var scripts = document.getElementsByClassName('toots-code');
function colorCode() {
  for (var a = 0; a < scripts.length; a++) {
    color(scripts[a]);
  }
}
colorCode();

//-- LOADER --//
var loader1 = document.getElementById('loader_1');
var loader2 = document.getElementById('loader_2');
var loader3 = document.getElementById('loader_3');

var l1 = new Loader({
  parent: loader1
});
l1.show();

var l2 = new Loader({
  parent: loader2
});
l2.show();

var l3 = new Loader({
  parent: loader3
});
l3.show();

//-- PAGINATION --//
var pag1 = document.getElementById('pagination_1');
var pag2 = document.getElementById('pagination_2');
var pag3 = document.getElementById('pagination_3');

function updatePage(res) {
  document.getElementById('page_tag').textContent = 'Page No.' + res.page;
}

var p1 = new Pagination({
  parent: pag1,
  pages: 12,
  limit: 5,
  callback: updatePage
});

var p2 = new Pagination({
  parent: pag2,
  pages: 8,
  limit: 3,
  callback: updatePage
});

//-- SWITCH --//
var container = document.getElementById('switch_1');

var sw = new TSwitch({
  parent: container,
  options: ["Option 1", "Option 2"]
});

//-- ALERT --//
var btn = document.getElementById('alert_btn');

btn.onclick = function () {
  customAlert({
    title: 'Custom alert',
    buttons: ["Accept", "Cancel"],
    content: "<p>Test content. Can be plain text or a HTML node</p>"
  });
};

//-- BOX RESIZE --//
var bx = document.getElementById('boxResize_1');
var box_resize_1 = new resize(bx);

},{"./tts_modules/box_resize":2,"./tts_modules/codeColor":3,"./tts_modules/customAlert/":4,"./tts_modules/loader/":5,"./tts_modules/pagination/":6,"./tts_modules/switch/":7,"./tts_modules/toast/":8}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function toots_resize(domParent) {
    var _this = this;

    _classCallCheck(this, toots_resize);

    this.parent = domParent;
    this.hBar = document.createElement('div');
    this.vBar = document.createElement('div');
    this.cBar = document.createElement('div');

    this.parent.classList.add("toots-resize");
    this.hBar.classList.add("horizontal");
    this.vBar.classList.add("vertical");
    this.cBar.classList.add("corner");

    var bars = [this.hBar, this.vBar, this.cBar];

    bars.forEach(function (el, i) {
      el.setAttribute("draggable", "true");
      el.classList.add("resizeBar");
      el.addEventListener('drag', _this.dragEv.bind(_this, i));
    });

    if (this.parent) {
      this.parent.appendChild(this.hBar);
      this.parent.appendChild(this.vBar);
      this.parent.appendChild(this.cBar);
    } else {
      throw new Error("toots_resize: Undefined parent");
    }
  }

  _createClass(toots_resize, [{
    key: 'dragEv',
    value: function dragEv(ind) {
      //ind
      //  0: Width resize
      //  1: Height resize
      //  2: Corner resize
      var parent_coords = this.parent.getBoundingClientRect();

      if (ind === 0) {
        if (this.parent.clientWidth + event.offsetX > 0) {
          this.parent.style.width = this.parent.clientWidth + event.offsetX + "px";
        }
      } else if (ind === 1) {
        if (this.parent.clientHeight + event.offsetY > 0) {
          this.parent.style.height = this.parent.clientHeight + event.offsetY + "px";
        }
        this.parent.style.height = this.parent.clientHeight + event.offsetY + "px";
      } else if (ind === 2) {
        if (this.parent.clientWidth + event.offsetX > 0 && this.parent.clientHeight + event.offsetY > 0) {
          this.parent.style.height = this.parent.clientHeight + event.offsetY + "px";
          this.parent.style.width = this.parent.clientWidth + event.offsetX + "px";
        }
      }
    }
  }]);

  return toots_resize;
}();

},{}],3:[function(require,module,exports){
"use strict";

module.exports = function colorCode(container, cls) {
  var count = 0; //This is to prevent infinite loops
  var operatorsRef = ["+", "-", "*", "/", "%", "++", "+=", "=+", "--", "-=", "=-", "**", "|", "||", "&", "&&", "=", "==", "===", "<", ">", "<=", ">=", "?", "@", "!"];
  var dividers = [" ", "\n", ".", "(", ")", "{", "}", ":", ","];
  var strDivider = ["'", '"', '`'];

  var classes = cls || ["str", "com", "kw", "par", "num", "op", "fn"];
  var objs = {};

  classes.forEach(function (key) {
    objs[key] = new Array();
    createSpans(key);
  });

  function createSpans(tag) {
    var val = container.innerHTML;
    var indx = val.indexOf(tag + ":");
    var i = 0;
    var word = "";
    var len = tag.length + 1;
    var stopCondition = void 0;

    while (indx != -1 && count < 500) {
      //'count < 500' is to prevent infinite loops
      var ltr = val.charAt(indx + len + i);
      var nxt = val.charAt(indx + len + i + 1);

      if (tag === "com") {
        stopCondition = nxt === "\n";
      } else if (tag === "str") {
        if (i === 0) stop = ltr;
        stopCondition = ltr === stop && i > 0;
      } else {
        stopCondition = dividers.includes(nxt) || operatorsRef.includes(nxt);
      }

      word += ltr;
      i++;

      if (stopCondition) {
        var arr = new Array();
        arr.push(tag + ":" + word);
        arr.push("<span class='" + tag + "'>" + word + "</span>");

        objs[tag].push(arr);

        word = "";
        indx = val.indexOf(tag + ":", indx + 1);
        i = 0;
      }
      count++; //This is to prevent infinite loops
    }
  }

  function replaceContent() {
    //Coment
    var len = Object.keys(objs).length;
    for (var a = 0; a < len; a++) {
      var key = Object.keys(objs)[a];
      objs[key].forEach(function (el, i) {
        container.innerHTML = container.innerHTML.replace(el[0], el[1]);
      });
    }
  }

  replaceContent();
};

},{}],4:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function toots_customAlert() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var title = options.title || "";
  var content = options.content;
  var buttons = options.buttons;
  var buttonsEvents = options.btnEvents;

  var background = document.createElement("div");
  background.classList.add("tts-alert-background");
  background.addEventListener("click", off.bind(background));

  var body = document.createElement("div");
  body.classList.add("tts-alert-body");

  var closeRow = document.createElement("div");
  closeRow.classList.add("tts-alert-closeRow");
  var titleObj = document.createElement("h3");
  var closeIcon = document.createElement("i");
  closeIcon.classList.add("material-icons");
  closeIcon.textContent = "close";
  closeIcon.addEventListener("click", off.bind(background));

  var contentBox = document.createElement("div");
  contentBox.classList.add("tts-alert-contentBox");

  var btnRow = document.createElement("div");
  btnRow.classList.add("tts-alert-btnRow");

  background.appendChild(body);
  body.appendChild(closeRow);
  body.appendChild(contentBox);
  body.appendChild(btnRow);
  closeRow.appendChild(titleObj);
  closeRow.appendChild(closeIcon);

  document.body.appendChild(background);

  if (title) {
    titleObj.textContent = title;
  }

  function off(ev) {
    if (ev.target.classList.contains("tts-alert-background") || ev.target.textContent == "close") {
      this.parentElement.removeChild(this);
    }
  }

  function createButtons() {
    if (buttons) {
      buttons.forEach(function (btn, i) {
        var newBtn = document.createElement("button");
        newBtn.textContent = btn;
        btnRow.appendChild(newBtn);
        newBtn.addEventListener("click", off.bind(background));
        if (buttonsEvents && buttonsEvents[i]) {
          btnRow.addEventListener("click", buttonsEvents[i].bind(newBtn));
        }
      });
    }
  }

  function setContent() {
    if (content) {
      if (typeof content === "string") {
        contentBox.innerHTML = content;
      } else if ((typeof content === "undefined" ? "undefined" : _typeof(content)) === "object") {
        contentBox.appendChild(content);
      }
    }
  }

  createButtons();
  setContent();
};

},{}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function toots_loader() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, toots_loader);

    this.parent = options.parent || document.body;
    this.id = this.parent.id + "_loader";
    this.animation = options.animation || "wheel";
    this.style = options.style || "default";

    this.animationsContent = {
      wheel: "<div class='wheel'></div>"
    };

    this.createObj();
  }

  _createClass(toots_loader, [{
    key: "createObj",
    value: function createObj() {
      this.background = document.createElement("div");
      this.background.id = this.id;
      this.background.classList.add("tts-loader-background");
      this.background.style.display = "none";
      this.child = document.createElement("div");
      this.child.classList.add("tts-loader-child");

      this.child.innerHTML = this.animationsContent[this.animation];
      this.background.appendChild(this.child);
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      this.parent.appendChild(this.background);
    }
  }, {
    key: "show",
    value: function show() {
      this.background.style.display = "block";
    }
  }, {
    key: "hide",
    value: function hide() {
      this.background.style.display = "none";
    }
  }]);

  return toots_loader;
}();

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function toots_pagination() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, toots_pagination);

    //--Pagination--//
    this.parent = options.parent;
    this.container = document.createElement("div");
    this.navFirst = document.createElement("div");
    this.navLast = document.createElement("div");
    this.navPrev = document.createElement("div");
    this.navNext = document.createElement("div");
    this.rail = document.createElement("ul");
    this.limit = options.limit || 5;
    this.pages = options.pages || 1;
    this.valuesCount = options.valuesCount || 0;
    this.offset = options.offset || 0;
    this.valuesLimit = options.valuesLimit || this.valuesCount;
    //--Page details--//
    this.showDetails = options.showDetails || false;
    this.detailsBox = document.createElement("div");
    this.detailsBox.classList.add("page-detail");
    //-- Basic Options --//
    this.container.classList.add("toots-pagination");
    this.container.id = options.id || this.defineId();

    this.navFirst.classList.add("navBtn");
    this.navFirst.classList.add("material-icons");
    this.navFirst.textContent = "first_page";

    this.navPrev.classList.add("navBtn");
    this.navPrev.classList.add("material-icons");
    this.navPrev.textContent = "navigate_before";

    this.navNext.classList.add("navBtn");
    this.navNext.classList.add("material-icons");
    this.navNext.textContent = "navigate_next";

    this.navLast.classList.add("navBtn");
    this.navLast.classList.add("material-icons");
    this.navLast.textContent = "last_page";

    this.rail.classList.add("rail");
    //--User callback on page change--//
    this.callback = options.callback;
    //--Build pagination object
    if (this.parent) {
      this.build();
    } else {
      throw new Error("toots-pagination: Parent element not defined");
    }
  }

  _createClass(toots_pagination, [{
    key: "defineId",
    value: function defineId() {
      var existing = document.getElementsByClassName("toots-pagination");
      var len = Object.keys(existing).length;
      return this.parent.id + "_toots_pagination_" + len;
    }
  }, {
    key: "build",
    value: function build() {
      //this.container.appendChild(this.navFirst)
      this.container.appendChild(this.navPrev);
      this.container.appendChild(this.rail);
      this.container.appendChild(this.navNext);
      //this.container.appendChild(this.navLast)
      this.parent.appendChild(this.container);

      this.navPrev.addEventListener("click", this.previousPage.bind(this, this.navPrev));
      this.navNext.addEventListener("click", this.nextPage.bind(this, this.navNext));

      this.setPages();

      this.selectPage(this.rail.children[0], true);
    }
  }, {
    key: "cleanActive",
    value: function cleanActive() {
      var actives = this.rail.querySelectorAll("li.active");
      actives.forEach(function (el) {
        el.classList.remove("active");
      });
    }
  }, {
    key: "setPages",
    value: function setPages(n) {
      this.rail.innerHTML = "";
      var a = 1;
      this.pages = n ? Number(n) : this.pages;
      while (a <= this.pages && a <= this.limit) {
        var btn = document.createElement("li");
        btn.textContent = a;
        btn.addEventListener("click", this.selectPage.bind(this, btn, false));
        this.rail.appendChild(btn);
        a++;
      }

      this.rail.children[0].classList.add("active");

      if (!n) {
        this.selectPage(this.rail.children[0]);
      }
    }
  }, {
    key: "selectPage",
    value: function selectPage(obj, initial) {
      this.selectedPage = Number(obj.textContent);
      var firstRailNumber = Number(this.rail.children[0].textContent);
      var btns = this.rail.children;
      var len = Object.keys(btns).length;
      var lastPage = false;
      var firstPage = false;

      this.cleanActive();

      if (this.selectedPage > firstRailNumber) {
        this.navPrev.classList.remove("disabled");
        // this.navFirst.classList.remove("disabled")
      }
      if (this.selectedPage === 1) {
        this.navPrev.classList.add("disabled");
        //this.navFirst.classList.add("disabled")
        firstPage = true;
      }
      if (this.selectedPage >= this.pages) {
        this.navNext.classList.add("disabled");
        //this.navLast.classList.add("disabled")
        lastPage = true;
      }
      if (this.selectedPage < this.pages) {
        this.navNext.classList.remove("disabled");
        //this.navLast.classList.remove("disabled")
      }

      obj.classList.add("active");
      var res = {
        obj: this,
        page: this.selectedPage,
        lastPage: lastPage,
        firstPage: firstPage
      };

      if (this.callback && !initial) {
        this.callback(res);
      }
    }
  }, {
    key: "nextPage",
    value: function nextPage(obj) {
      var btn = this.container.querySelectorAll(".active")[0];
      var nextBtn = btn.nextElementSibling;
      var page = Number(btn.textContent);
      if (nextBtn && nextBtn.textContent != " ") {
        btn.classList.remove("active");
        this.selectPage(nextBtn);
      } else if (!nextBtn && page < this.pages) {
        this.nextBunch(page);
      }
    }
  }, {
    key: "previousPage",
    value: function previousPage(obj) {
      var btn = this.container.querySelectorAll(".active")[0];
      var prevBtn = btn.previousElementSibling;
      var page = Number(btn.textContent);
      if (prevBtn && prevBtn.textContent != " ") {
        btn.classList.remove("active");
        this.selectPage(prevBtn);
      } else if (!prevBtn && page > 1) {
        this.previousBunch(page);
      }
    }
  }, {
    key: "nextBunch",
    value: function nextBunch(page) {
      this.navPrev.classList.remove("disabled");
      this.rail.innerHTML = "";
      var f = page + 1;
      for (var a = 0; a < this.limit; a++) {
        var li = document.createElement("li");
        if (f + a <= this.pages) {
          li.textContent = f + a;
          li.addEventListener("click", this.selectPage.bind(this, li, false));
        } else {
          li.textContent = " ";
        }
        this.rail.appendChild(li);
      }
      this.selectPage(this.rail.children[0]);
    }
  }, {
    key: "previousBunch",
    value: function previousBunch(page) {
      this.navNext.classList.remove("disabled");
      this.rail.innerHTML = "";
      var f = page - 5 < 1 ? 1 : page - 5;
      for (var a = 0; a < this.limit; a++) {
        var li = document.createElement("li");
        li.textContent = f + a;
        li.addEventListener("click", this.selectPage.bind(this, li, false));
        this.rail.appendChild(li);
      }
      this.selectPage(this.rail.children[this.limit - 1]);
    }
  }]);

  return toots_pagination;
}();

},{}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function tts_switch() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, tts_switch);

    this.userOptions = options;
    this.parent = options.parent;
    this.options = options.options || ["On", "Off"];
    this.option1 = this.options[0] || "On";
    this.option2 = this.options[1] || "Off";
    this.style = options.style || "default";
    this.container = document.createElement("div");
    this.container.classList.add("tts-switch-container");
    this.container.classList.add(this.style);
    this.container.classList.add("f");
    this.container.addEventListener("click", this.toggleOptions.bind(this));
    this.value = this.option1;

    this.build.call(this);
  }

  _createClass(tts_switch, [{
    key: "build",
    value: function build() {
      //Create elements inside switch container
      var firstOption = document.createElement("div");
      firstOption.classList.add("tts-switch-option");
      firstOption.textContent = this.option1;
      if (this.userOptions.parentCenter) {
        //Center on parent element
      }
      var lastOption = document.createElement("div");
      lastOption.classList.add("tts-switch-option");
      lastOption.textContent = this.option2;
      var rail = document.createElement("div");
      rail.classList.add("tts-switch-rail");
      var button = document.createElement("div");
      button.classList.add("tts-switch");

      rail.appendChild(button);
      this.container.appendChild(firstOption);
      this.container.appendChild(rail);
      this.container.appendChild(lastOption);

      this.parent.appendChild(this.container);
    }
  }, {
    key: "toggleOptions",
    value: function toggleOptions() {
      if (this.container.classList.contains("f")) {
        this.container.classList.remove("f");
        this.container.classList.add("l");
        this.value = this.option2;
      } else {
        this.container.classList.add("f");
        this.container.classList.remove("l");
        this.value = this.option1;
      }
    }
  }]);

  return tts_switch;
}();

},{}],8:[function(require,module,exports){
"use strict";

module.exports = function toots_toast() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var container = document.getElementById("tts-toast-container");
	var child = void 0;
	var text = options.text;
	var duration = options.duration || 3000;
	var position = options.position || "bottom-center";

	if (!container) {
		container = document.createElement("div");
		container.classList.add("tts-toast-container");
		container.id = "tts-toast-container";
		document.body.appendChild(container);
		if (position) {
			var al = position.split("-");
			container.classList.add(al[0]);
			container.classList.add(al[1]);
		} else {
			container.classList.add("bottom");
			container.classList.add("center");
		}
	}

	var toast = document.createElement("div");
	toast.classList.add("tts-toast");

	if (text) {
		toast.textContent = text;
	}

	if (!child) {
		container.appendChild(toast);
	} else {
		container.classList.add("new");
		var _child = container.children[0];
		setTimeout(function () {
			container.insertBefore(toast, _child);
			container.classList.remove("new");
		}, 1000);
	}

	setTimeout(function () {
		toast.classList.add("fadeOut");
		setTimeout(function () {
			toast.parentElement.removeChild(toast);
		}, 1000);
	}, duration);
};

},{}]},{},[1]);
