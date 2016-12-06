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

export default class Courier {
	constructor() {
		this.listeners = {};
		this.middleware = {};
	}

	/**
	 * @param {string} key
	 * @param {function} listener
	 */
	subscribe(key, listener) {
		if (this.listeners[key] === undefined) {
			this.listeners[key] = [];
		}

		this.listeners[key].push(listener);
	}

	/**
	 * @param {string} key
	 * @param {object} data
	 */
	publish(key, data) {
		let listeners = this.listeners[key];
		let middleware = this.middleware[key];

		if (!listeners) { listeners = []; }
		if (!middleware) { middleware = []; }

		this.dispatch(data, middleware, function(processedData) {
			listeners.forEach((listener) => { listener(processedData); });
		});
	}

	/**
	 * @param {string} key
	 * @param {function} middleware
	 */
	register(key, middleware) {
		if (this.middleware[key] === undefined) {
			this.middleware[key] = [];
		}

		this.middleware[key].push(middleware);
	}

	/**
	 * @param {*} value
	 * @param {Array} middleware
	 * @param {function} done
	 * @returns {*}
	 */
	dispatch(value, middleware, done) {
		//this function is based upon the middleware code from express
		let idx = 0;
		if(middleware.length === 0) {
			return done(value);
		}

		next(value);

		function next(value) {
			let layer = middleware[idx++];
			if(!layer) {
				done(value);
			} else {
				layer(value, next);
			}
		}
	}

	/**
	 * @param {string} key
	 */
	clear(key) {
		this.listeners[key] = [];
	}
}
