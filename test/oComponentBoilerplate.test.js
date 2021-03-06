/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import ComponentBoilerplate from './../main';

describe("ComponentBoilerplate", () => {
	it('is defined', () => {
		proclaim.equal(typeof ComponentBoilerplate, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof ComponentBoilerplate.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(ComponentBoilerplate, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(ComponentBoilerplate, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new", () => {
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = ComponentBoilerplate.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof ComponentBoilerplate, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = ComponentBoilerplate.init('#element');
			proclaim.equal(boilerplate instanceof ComponentBoilerplate, true);
		});
	});
});
