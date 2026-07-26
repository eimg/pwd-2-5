import { useEffect, useMemo, useState } from "react";

function doSomething() {
    console.log("Function call...");
    return "Do something...";
}

export default function App() {
	const [count, setCount] = useState(0);

    const value = useMemo(() => {
        return doSomething();
    }, []);

	return (
		<div>
			<h1>Count: {count}</h1>
			<button onClick={() => setCount(count + 1)}>Increase</button>
		</div>
	);
}
