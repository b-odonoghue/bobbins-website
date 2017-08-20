export class RealVector {
    constructor(public components:number[]) {}

    get dimension():number {
        return this.components.length;
    }

    get magnitude():number {
        return Math.sqrt(this.times(this.complexConjugate));
    }

    plus(other:RealVector):RealVector {
        return new RealVector(this.components.map((c, i)=>c + other.components[i]));
    }

    times(other:RealVector):number {
        const parts = this.components.map((value, index) => value * other.components[index]);
        return parts.reduce((a,b) => a + b, 0);
    }

    get complexConjugate():RealVector {
        return this;
    }
}