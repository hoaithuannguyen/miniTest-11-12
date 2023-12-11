const express = require("express");
const router = express.Router();
const fs = require("fs");
const { middleWare } = require("../middleware/middleWare");

// Đọc file db.json
const rawData = fs.readFileSync("db.json");
const data = JSON.parse(rawData);
console.log("data", data);
//tạo router để client lấy dữ liệu
router.get("/", async (req, res) => {
    const { per_page } = req.query
    const arr = data.todoList.slice(0, per_page)
    res.status(200).json(arr);
});
//tạo router để client push
router.post("/", middleWare, (req, res) => {
    data.todoList.unshift(req.body);
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.status(201).json(data.todoList);
});
//tạo router để sửa
router.put("/:id", middleWare, (req, res) => {
    const { id } = req.params;
    const index = data.todoList.findIndex((item) => item.id == id);
    data.todoList[index] = req.body;
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.status(201).json(data.todoList);
});
//tạo router để xóa
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const newTodo = data.todoList.filter((item) => item.id != id);
    data.todoList = newTodo;
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.status(201).json(data.todoList);
});
//tạo router để xóa hết
router.delete("", (req, res) => {
    data.todoList = [];
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.status(201).json(data.todoList);
});
//tạo router để complete
router.patch("/:id",(req,res)=>{
    const { id } = req.params;
    const index = data.todoList.findIndex((item) => item.id == id);
    data.todoList[index].complete = !data.todoList[index].complete;
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.status(201).json(data.todoList);
})

module.exports = router;