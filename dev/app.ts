let x: number;
x = 123;

function add(a: number, b: number) {
	return a + b;
}

interface User {
	id: number;
	name: string;
	bio?: string;
}

let alice: User;
alice = { id: 1, name: "Alice" };

type Student = {
	id: number;
	name: string;
};

let bob: Student = { id: 2, name: "Bob" };

let eve: Student & { grade: "A" | "B" } = { 
    id: 3, 
    name: "Eve", 
    grade: "A",
};

function wrap<T>(value: T) {
    return [value];
}

wrap<number>(123);
wrap<string>("abc");
