export type MapperFunction<FromType, ToType> = (originalElement:FromType)=>ToType;

export interface List<ValueType> {
    toString():string;
    length:number;
    map<ToType>(mapperFunction:MapperFunction<ValueType, ToType>):List<ToType>;
}

export const EmptyList:List<never> = {
    toString() { return '.'; },
    length: 0,
    map(mapperFunction:MapperFunction<never,never>):List<never> { return EmptyList; }
}

export class NonEmptyList<ValueType> implements List<ValueType> {
    constructor(private firstElement:ValueType, private remainingList:List<ValueType>) {}

    toString() { return `${this.firstElement},${this.remainingList.toString()}`; }
    get length():number { return 1 + this.remainingList.length; }
    map<ToType>(mapperFunction:MapperFunction<ValueType, ToType>):List<ToType> {
        return new NonEmptyList(mapperFunction(this.firstElement), this.remainingList.map(mapperFunction));
    }
}

const list123 = new NonEmptyList<number>(1,new NonEmptyList(2,new NonEmptyList(3,EmptyList)));
const favColors = new NonEmptyList<string>("red",new NonEmptyList("green",new NonEmptyList("blje",EmptyList)));
const squares = list123.map(e => e * e);

console.log(EmptyList.toString());
console.log(list123);

export interface Monad<T> {
    identityElement:T;
    binaryOperation:(t1:T, t2:T)=>T;
}