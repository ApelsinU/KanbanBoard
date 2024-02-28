const Todo = require("../database/models/Todo");
const { Router } = require("express");

const authInterceptor = require("../interceptors/auth-interceptor");

const router = Router();
module.exports = router;

// OK
// api/todos/
router.get("/", authInterceptor, async (req, res) => {
  try {
    const todos = await Todo.find({owner: req.user.userId});

    res.json(todos);
    res.status(201);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// OK
// api/todos/add
router.post("/add", authInterceptor, async (req, res) => {
  try {
    const { id, title, status } = req.body;
    const owner = req.user.userId

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
      owner: owner,
    });

    await todo.save();
    res.json(todo);
    res.status(201);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// OK
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

// todo: don't work, check why
// api/todos/move
router.put("/move", async (req, res) => {
  try {
    const { id, new_id, new_status } = req.body;

    const todo = await Todo.findOne({ id: id });

    if (!todo) {
      return res.json({
        message: `Error - Todo with such Id doesn't exist`,
      });
    }

    await todo.updateOne({ id: new_id, title: todo.title, status: new_status });
    // id - repeated keys error
    // await todo.updateOne({ id: 999, title: todo.title, status: new_status });

    res.status(200).json({ success: true});
  } catch (e) {
    res.status(500).json(e);
  }
});

// OK
// api/todos/delete
router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    const todo = await Todo.findOne({ id: id });
    if (!todo) {
      return res.json({
        message: "Error - Todo with such Id doesn't exist",
      });
    }

    await todo.deleteOne({ id: id });
    res.status(200).json({ success: true});
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});
