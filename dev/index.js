import jwt from "jsonwebtoken";

const key = "some-secret";
const user = { name: "Eve", age: 22 };

const token = jwt.sign(user, key);

console.log(token);

const output = jwt.verify(token, key);
console.log(output);
