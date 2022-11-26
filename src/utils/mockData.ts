const mockUser = {
  login: 'TimeLess',
  password: 'TimeLess2022',
};

const mockTaskList = {
  name: 'Home Duty',
  create: false,
  read: false,
  update: false,
  delete: false,
};

const mockTask = {
  id: 10,
  isCompleted: false,
  taskListId: 23,
  name: 'Wash the dishes',
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImxvZ2luIjoiUmVnaXNlciIsImlhdCI6MTY2OTQ2MDE4NX0.bRR3A68Jc_hiOoMSFJGj-fZkxeYcmNu7oZAEGMZn8yQ';

export { mockUser, mockTaskList, token, mockTask };
