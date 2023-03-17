const Todo = require("../database/models/Todo");
const { Router } = require("express");

const authInterceptor = require("../interceptors/auth-interceptor");

const router = Router();
module.exports = router;

// api/todos/
router.get("/", authInterceptor, async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user.userId });
    console.log("todos", todos);
    res.json(todos);
    res.status(201);
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
    const { id, title, status } = req.body;

    const isExist = await Todo.findOne({ id: id });
    if (isExist) {
      return res.json({
        todo: isExist,
      });
    }

    const todo = new Todo({
      id: id,
      title: title,
      status: status,
      owner: req.user.userId,
    });

    await todo.save();
    res.json(todo);
    res.status(201);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// api/todos/edit
router.put("/edit", async (req, res) => {
  try {
    const { id, title, status } = req.body;

    const todo = await Todo.findOne({ id: id });
    if (!todo) {
      return res.json({
        message: `Error - Todo with such Id doesn't exist`,
      });
    }

    await todo.update({ id, title, status });
    const newTodo = await Todo.findOne({ id: id });

    res.json(newTodo);
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

    await todo.deleteOne({ deletedTodo });
    res.status(201);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});
