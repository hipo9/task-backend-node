const { response } = require('express');
const {
  getAllTasks,
  createTaskDb,
  deleteTaskDb,
  updateTaskDb,
} = require('../model');
//* listo
const getTasks = async (req, res = response) => {
  const id = req.id;
  const { ok, message, status, tasks } = await getAllTasks({ id });
  if (!ok) {
    return res.status(status).json({
      ok,
      message,
      tasks: [],
    });
  }
  return res.status(status).json({
    ok,
    message,
    tasks,
  });
};

//* listo
const createTask = async (req, res = response) => {
  const userId = req.id;
  const newTask = {
    ...req.body,
    userId,
  };
  const result = await createTaskDb(newTask);
  const { ok, status, message } = result;
  if (!ok) {
    return res.status(status).json({
      ok: ok,
      message,
    });
  }
  return res.status(status).json({
    ok,
    message,
    tasks: result,
  });
};
const updateTask = async (req, res = response) => {
  const id = req.params.id;
  const newTask = {
    ...req.body,
    id,
  };
  const result = await updateTaskDb(newTask);
  const { ok, status, message } = result;
  return res.status(status).json({
    ok,
    status,
    message,
  });
};

//* listo
const deleteTask = async (req, res = response) => {
  const id = req.params.id;
  const result = await deleteTaskDb({ id });
  const { ok, status, message } = result;
  return res.status(status).json({
    ok,
    message,
    status,
  });
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};
