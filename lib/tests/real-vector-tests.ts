import {expect} from 'chai';
import {Let} from 'mocha-let-ts';
import './support';
import {RealVector} from "../public/js/real-vector";

describe('Vector', () => {
    const composedArray = Let(()=>[] as number[]);
    const vector = Let(() => new RealVector(composedArray()));

    describe('constructor', () => {
        it('yields a new Vector', () => {
            expect(vector()).to.be.an.instanceOf(RealVector);
        });
    });

    describe('dimension', () => {
        context('when composedArray is empty', () => {
            it(`is 0`, () => {
                expect(vector().dimension).to.equal(0);
            });
        });

        context('when composedArray is [1,2,3]', () => {
            composedArray(()=>[1,2,3]);
            it(`is 3`, () => {
                expect(vector().dimension).to.equal(3);
            });
        });
    });

    describe(`magnitude`, () => {
        context('when composedArray is empty', () => {
            it(`is 0`, () => {
                expect(vector().magnitude).to.equal(0);
            });
        });

        context('when composedArray, [1,1,1]', () => {
            composedArray(()=>[1,1,1]);
            it(`is root 3`, () => {
                expect(vector().magnitude).to.equal(Math.sqrt(3));
            });
        });
    });
});