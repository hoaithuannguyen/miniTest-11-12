const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const todoListRouter = require("./router/todoList");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// tạo router
app.use("/api/v1/todo", todoListRouter);

// chạy server
const PORT = 6886;
app.listen(PORT, () => {
    console.log(`Server đang chạy cổng ${PORT}`);
});