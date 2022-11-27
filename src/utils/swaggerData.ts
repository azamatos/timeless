//  swagger data for USER

const user = {
  login: 'Timeless',
  password: 'Timeless2022',
};

const updatedUser = {
  login: 'Timeless',
  password: 'TimelessCorp',
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNmZ3NkZ2ZzZ2RmZyIsImlhdCI6MTY1OTE3NzU3MSwiZXhwIjoxNjU5MTc4NDcxfQ.WS3R7VnPT4Wo0G522MDDUxRGUyZ5QBSEYQzHQVo0ag8';

const registerSchema = {
  status: 201,
  description: 'Returns registered user',
  schema: { example: user },
};

const loginSchema = {
  status: 200,
  description: 'Returns registered user',
  schema: { example: { token } },
};

const updateSchema = {
  status: 200,
  description: 'Returns registered user',
  schema: { example: updatedUser },
};

//  swagger data for TASK

const task1 = {
  id: 3,
  name: 'Wash the dishes',
  isCompleted: false,
};

const createTask = {
  name: 'Wash the dishes',
  isCompleted: false,
  taskListId: 2,
};

const basicTaskList = {
  id: 2,
  name: 'Home Duty',
};

const task2 = {
  id: 4,
  name: 'Clean the bathroom',
  isCompleted: true,
};

const taskResponse = (description: string) => {
  return {
    status: 200,
    description,
    schema: {
      example: {
        ...task1,
        TaskList: basicTaskList,
      },
    },
  };
};

const createTaskBody = {
  schema: {
    example: createTask,
  },
};

const updateTaskBody = {
  schema: {
    example: { id: 4, ...createTask },
  },
};

//  swagger data for TASK LIST

const taskList = {
  name: 'Home Duty',
  create: false,
  read: false,
  update: false,
  delete: false,
};

const taskListSchema = {
  status: 200,
  description: 'Returns registered user',
  schema: { example: { id: 2, ...taskList, tasks: [task1] } },
};

const taskListsSchema = {
  status: 200,
  description: 'Returns registered user',
  schema: {
    example: [
      { id: 2, ...taskList, tasks: [task1] },
      {
        id: 3,
        ...taskList,
        tasks: [task2],
      },
    ],
  },
};

const taskListShemaById = {
  status: 200,
  description: 'Returns registered user',
  schema: { example: { id: 2, ...taskList, tasks: [task1] } },
};

const taskListBody = {
  schema: {
    example: taskList,
  },
};

const paramSchema = {
  name: 'id',
  required: true,
  description: 'data identificator',
  schema: { type: 'integer' },
};

export {
  registerSchema,
  loginSchema,
  updateSchema,
  taskListSchema,
  taskListBody,
  taskListsSchema,
  paramSchema,
  taskListShemaById,
  createTaskBody,
  updateTaskBody,
  taskResponse,
};
