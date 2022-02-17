import { RequestHandler } from "express";
export declare class TasksController {
    static getTasks: RequestHandler;
    static getTasksProgress: RequestHandler;
    static getTaskGroups: RequestHandler;
    static createTask: RequestHandler;
    static deleteTask: RequestHandler;
    static editTask: RequestHandler;
}
