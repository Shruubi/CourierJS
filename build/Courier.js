/*
 * Copyright (c) 2016 Damon Swayn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Courier = function () {
	function Courier() {
		_classCallCheck(this, Courier);

		this.listeners = {};
		this.middleware = {};
	}

	/**
  * @param {string} key
  * @param {function} listener
  */


	_createClass(Courier, [{
		key: "subscribe",
		value: function subscribe(key, listener) {
			if (this.listeners[key] === undefined) {
				this.listeners[key] = [];
			}

			this.listeners[key].push(listener);
		}

		/**
   * @param {string} key
   * @param {object} data
   */

	}, {
		key: "publish",
		value: function publish(key, data) {
			var listeners = this.listeners[key];

			if (listeners === undefined || listeners === null) listeners = [];

			var processedData = this.applyMiddleware(key, data);
			listeners.forEach(function (listener) {
				listener(processedData);
			});
		}

		/**
   * @param {string} key
   * @param {function} middleware
   */

	}, {
		key: "register",
		value: function register(key, middleware) {
			if (this.middleware[key] === undefined) {
				this.middleware[key] = [];
			}

			this.middleware[key].push(middleware);
		}

		/**
   * @param {string} key
   * @param {object} data
   * @returns {*}
   */

	}, {
		key: "applyMiddleware",
		value: function applyMiddleware(key, data) {
			var d = data;
			var middleware = this.middleware[key];

			if (middleware === undefined || middleware === null) middleware = [];

			middleware.forEach(function (middlewareFunc) {
				d = middlewareFunc(d);
			});

			return d;
		}

		/**
   * @param {string} key
   */

	}, {
		key: "clear",
		value: function clear(key) {
			this.listeners[key] = [];
		}
	}]);

	return Courier;
}();

exports.default = Courier;
//# sourceMappingURL=Courier.js.map
