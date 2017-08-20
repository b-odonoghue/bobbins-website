import { ComplexNumber, ComplexAdditiveIdentity } from './ComplexNumber';

export class ComplexVector {
    constructor(public components:ComplexNumber[]) {}

    get dimension():number {
        return this.components.length;
    }

    get magnitude():number {
        return Math.sqrt(this.times(this.complexConjugate).realPart);
    }

    plus(other:ComplexVector):ComplexVector {
        return new ComplexVector(this.components.map((c,i)=>c.plus(other.components[i])));
    }

    times(other:ComplexVector):ComplexNumber {
        const parts = this.components.map((value, index) => value.times(other.components[index]));
        return parts.reduce((a,b) => a.plus(b), ComplexAdditiveIdentity);
    }

    get complexConjugate():ComplexVector {
        return new ComplexVector(this.components.map(c => c.complexConjugate));
    }
}