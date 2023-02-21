const Todo = require("../database/models/Todo");
const { Router } = require("express");

const auth = require("../interceptors/auth-interceptor");

const router = Router();
module.exports = router;

// api/todos/
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user.userId });
    res.json(todos);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// api/todos/{id}
router.get("/:id", async (req, res) => {
  try {
    // const todo = await Todo.findById(req.params.id);
    // res.json(todo);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// api/todos/add
router.post("/add", async (req, res) => {
  try {
    const newTodo = req.body;
    console.log("newTodo", newTodo);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// api/todos/edit
router.put("/edit", async (req, res) => {
  try {
    // const todos = Todo;
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// api/todos/delete
router.delete("/delete", async (req, res) => {
  try {
    // const todos = Todo;
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});
