const { connection } = require('../database/conectDB');

const getAllTasks = async ({ id }) => {
  try {
    const query = 'SELECT * FROM tasks where user_id= ?';

    const { rows } = await connection.executeQuery(query, [id]);
    if (!rows.length)
      return { ok: false, message: 'Empty task list', status: 200 };
    return {
      ok: true,
      message: 'Found list succesful',
      status: 200,
      tasks: rows,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'something was wrong, please contact the administrator',
      status: 500,
    };
  }
};
const createTaskDb = async (task = {}) => {
  const { title, description, completed, userId } = task;

  const query = `INSERT INTO tasks(title, description, completed, user_id) 
   VALUE (?,?,?,?)`;

  try {
    const values = [title, description, completed, userId];
    const { rows } = await connection.executeQuery(query, values);
    if (rows.affectedRows) {
      return {
        ok: true,
        message: 'The task has been created succefully',
        status: 201,
        // tasks: tasks,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Something went wrong, please contac with the administrator',
      status: 500,
    };
  }
};
const updateTaskDb = async (newTaskUpdated) => {
  const { title, description, completed, id } = newTaskUpdated;

  const query = `UPDATE tasks SET title=?, description=?, completed=? WHERE id=?`;
  const value = [title, description, completed, id];
  try {
    const { rows } = await connection.executeQuery(query, value);
    console.log(rows);
    if (!rows.affectedRows) {
      return {
        ok: false,
        status: 404,
        message: 'The task has not been updated succefully, check your data',
        
      };
    }

    return {
      ok: true,
      status: 200,
      message: 'The task has been updated succesfully',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      status: 500,
      message: 'something went wrong, please contact with the administrator',
    };
  }
};

//* listo
const deleteTaskDb = async ({ id }) => {
  try {
    const query = 'DELETE FROM tasks WHERE id=?';
    const { rows } = await connection.executeQuery(query, [id]);
    if (!rows.affectedRows) {
      return {
        ok: false,
        status: 401,
        message: "The taks doesn't exist for that id",
      };
    }
    return {
      ok: true,
      status: 200,
      message: 'The task has been removed successfully',
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: 'something went wrong, please contact with the administrator',
    };
  }
};

/* pasos
1. crear o importar la conexion

 */

module.exports = {
  getAllTasks,
  createTaskDb,
  updateTaskDb,
  deleteTaskDb,
};

/* 
the task has been created succefully 404
something went wrong, please contact with the administrator  500
it has been removed successfully 200
The task has been updated succesful 200
the task has been created succefully 200
Found list succesful 200
*/
