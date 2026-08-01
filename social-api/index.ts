import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded());

import { router as usersRouter } from "./routes/users";
app.use(usersRouter);

import { router as postsRouter } from "./routes/posts";
app.use(postsRouter);

app.get("/", (req, res) => {
    res.json({ project: "Social API", status: "Running..." });
});

app.listen(8800, () => {
    console.log("Social API running at 8800...");
});
