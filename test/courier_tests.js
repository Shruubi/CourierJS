let expect = require('expect.js');
import Courier from "../src/Courier";

describe('Courier', function () {

	describe('sanity check', function () {
		it('should verify true is true', function () {
			expect(true).to.be.eql(true);
		});
	});

	describe('#subscribe()', function () {
		it('should be 0 when instantiated', function () {
			let courier = new Courier();
			expect(Object.keys(courier.listeners)).to.have.length(0);
		});

		it('should have length 1 after someone subscribes', function () {
			let courier = new Courier();
			courier.subscribe('test', function () {});
			expect(Object.keys(courier.listeners)).to.have.length(1);
		});

		it('should have length 1 for subscribed functions', function () {
			let courier = new Courier();
			courier.subscribe('test', function () {});
			expect(courier.listeners['test']).to.have.length(1);
		});
	});

	describe('#publish()', function () {
		it('should receive message', function () {
			let courier = new Courier();
			courier.subscribe('test', function () {
				expect(true).to.be.ok();
			});

			courier.publish('test', {});
		});

		it('should receive message with data', function () {
			let courier = new Courier();
			courier.subscribe('test', function (data) {
				expect(data.testVal).to.eql(5);
			});

			courier.publish('test', { testVal: 5 });
		});

		it('should be received by all listeners', function () {
			let courier = new Courier();
			let counter = 0;
			courier.subscribe('test', function () {
				counter += 1;
			});

			courier.subscribe('test', function () {
				counter += 1;
			});

			courier.subscribe('test', function () {
				expect(counter).to.eql(2);
			});

			courier.publish('test', {});
		});
	});

	describe('#clear()', function () {
		it('should reset assigned listeners array to 0', function () {
			let courier = new Courier();
			courier.subscribe('test', function () {});
			courier.clear('test');
			expect(courier.listeners['test']).to.have.length(0);
		});

		it('should create key and set the listener array to empty if key does not exist', function () {
			let courier = new Courier();
			courier.clear('test');
			expect(courier.listeners['test']).to.be.an('array');
		});
	});

	describe('#register()', function () {
		it('should be 0 when instantiated', function () {
			let courier = new Courier();
			expect(Object.keys(courier.middleware)).to.have.length(0);
		});

		it('should have length 1 after someone registers some middleware', function () {
			let courier = new Courier();
			courier.register('test', function () {});
			expect(Object.keys(courier.middleware)).to.have.length(1);
		});

		it('should have length 1 for middleware functions', function () {
			let courier = new Courier();
			courier.register('test', function () {});
			expect(courier.middleware['test']).to.have.length(1);
		});
	});

	describe('#applyMiddleware()', function () {
		it('should propogate the data modified by the functions correctly', function () {
			let courier = new Courier();

			courier.register('test', function (data) {
				data.val += 1;
				return data;
			});

			courier.register('test', function (data) {
				data.val += 1;
				return data;
			});

			courier.register('test', function (data) {
				data.val += 1;
				return data;
			});

			expect(courier.applyMiddleware('test', { val: 0 })).to.eql({ val: 3 });
		});
	});

	describe('#publish() - with middleware', function () {
		it('should apply middleware to published event', function () {
			let courier = new Courier();

			courier.subscribe('test', function (data) {
				expect(data.val).to.eql(3);
			});

			courier.register('test', function (data) {
				data.val += 1;
				return data;
			});

			courier.register('test', function (data) {
				data.val += 1;
				return data;
			});

			courier.register('test', function (data) {
				data.val += 1;
				return data;
			});

			courier.publish('test', { val: 0 });
		});
	});
});