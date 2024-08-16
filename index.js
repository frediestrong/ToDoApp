//x2w8sMnMp0QxuEIp
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://okornoef:x2w8sMnMp0QxuEIp@todolist.fjxez.mongodb.net/?retryWrites=true&w=majority&appName=todoList",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

const todoScheme = new mongoose.Schema({
  title: String,
  compeleted: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

//Get all todo
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

//Create a new todo
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    completed: false,
  });
  await newTodo.save();
  res.json(newTodo);
});

//Update existing todo
app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.compeleted = req.body.compeleted;
  await todo.save();
  res.json(todo);
});

//Delete a todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
