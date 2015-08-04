//Write jsx here
//you can use es6 + jsx syntax that babel supports

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = (function () {
    function View(options) {
        _classCallCheck(this, View);

        this.model = options.model;
        this.template = options.template;
    }

    _createClass(View, [{
        key: "render",
        value: function render() {
            return _.template(this.template, this.model.toObject());
        }
    }]);

    return View;
})();
//# sourceMappingURL=all.js.map