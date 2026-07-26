import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({ project: "Social API", status: "Running..." });
});

app.get("/users", (req, res) => {
    const users = [
        { name: "Alice", username: "alice" },
        { name: "Eve", username: "eve" },
    ];

    res.json(users);
});

app.listen(8800, () => {
    console.log("Social API running at 8800...");
});
