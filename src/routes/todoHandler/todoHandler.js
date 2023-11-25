const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require("../../models/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);

// get all the todo

router.get("/", async (req, res) => {});

// get a todo by id
router.get("/:id", async (req, res) => {});

// post todo by id
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "server side error!",
      });
    } else {
      res.status(200).json({
        message: " Todo Was inserted Success",
      });
    }
  });
});

module.exports = router;
