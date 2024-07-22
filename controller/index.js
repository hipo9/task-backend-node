const { registerUser, login, revalidateToken } = require('./authController');
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require('./taskController');

module.exports = {
  registerUser,
  login,
  revalidateToken,
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};
