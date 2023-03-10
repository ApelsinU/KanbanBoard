const Todo = require("../database/models/Todo");
const { Router } = require("express");

const authInterceptor = require("../interceptors/auth-interceptor");

const router = Router();
module.exports = router;

// api/todos/
router.get("/", authInterceptor, async (req, res) => {
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
router.post("/add", authInterceptor, async (req, res) => {
  try {
    const newTodo = req.body;

    const isExist = await Todo.findOne({ newTodo });
    if (isExist) {
      return res.json({
        message: "Error - Todo with same Id is already exist",
      });
    }

    const todo = new Todo({
      id: newTodo.id,
      title: newTodo.title,
      status: newTodo.status,
      owner: req.user.userId,
    });

    await todo.save();
    res.status(201);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// api/todos/edit
router.put("/edit", async (req, res) => {
  try {
    const editTodo = req.body;

    const todo = await Todo.findOne({ editTodo });
    if (!todo) {
      return res.json({
        message: `Error - Todo with such Id doesn't exist`,
      });
    }

    todo.update({ editTodo });
    res.status(201);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// api/todos/delete
router.delete("/delete", async (req, res) => {
  try {
    const deletedTodo = req.body;

    const todo = await Todo.findOne({ deletedTodo });
    if (!todo) {
      return res.json({
        message: "Error - Todo with such Id doesn't exist",
      });
    }

    todo.deleteOne({ deletedTodo });
    res.status(201);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});
