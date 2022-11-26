
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateTaskListInput {
    name: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}

export class UpdateTaskListInput {
    id: number;
    name?: Nullable<string>;
    create?: Nullable<boolean>;
    read?: Nullable<boolean>;
    update?: Nullable<boolean>;
    delete?: Nullable<boolean>;
}

export class CreateTaskInput {
    name: string;
    taskListId: number;
    isCompleted?: Nullable<boolean>;
}

export class UpdateTaskInput {
    id: number;
    name?: Nullable<string>;
    isCompleted?: Nullable<boolean>;
    taskListId: number;
}

export class UserInput {
    login: string;
    password: string;
}

export class TaskList {
    id: number;
    name: string;
    tasks?: Nullable<Nullable<Task>[]>;
}

export class MutationTaskList {
    id: number;
    name: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}

export abstract class IQuery {
    abstract myLists(): Nullable<Nullable<TaskList>[]> | Promise<Nullable<Nullable<TaskList>[]>>;

    abstract findList(id: number): Nullable<TaskList> | Promise<Nullable<TaskList>>;

    abstract otherLists(): Nullable<Nullable<TaskList>[]> | Promise<Nullable<Nullable<TaskList>[]>>;

    abstract getTask(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract login(loginInput?: Nullable<UserInput>): LoginResponse | Promise<LoginResponse>;
}

export abstract class IMutation {
    abstract createTaskList(createTaskListInput: CreateTaskListInput): Nullable<MutationTaskList> | Promise<Nullable<MutationTaskList>>;

    abstract updateTaskList(updateTaskListInput: UpdateTaskListInput): Nullable<MutationTaskList> | Promise<Nullable<MutationTaskList>>;

    abstract removeTaskList(id: number): Nullable<TaskList> | Promise<Nullable<TaskList>>;

    abstract createTask(createTaskInput: CreateTaskInput): Nullable<Task> | Promise<Nullable<Task>>;

    abstract updateTask(updateTaskInput: UpdateTaskInput): Nullable<Task> | Promise<Nullable<Task>>;

    abstract removeTask(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract register(registerInput: UserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updatePassword(updateUserInput: UserInput): Nullable<User> | Promise<Nullable<User>>;
}

export class Task {
    id: number;
    name: string;
    isCompleted: boolean;
}

export class User {
    id: number;
    login: string;
    password: string;
    task_list: TaskList[];
}

export class LoginResponse {
    token: string;
}

type Nullable<T> = T | null;
