import { TaskCreateModel, TaskStatus } from "../models";
interface GroupTotalTask {
    readonly groupId: number;
    readonly totalCount: number;
}
interface GroupDoneTask {
    readonly groupId: number;
    readonly doneCount: number;
}
declare type TaskProgress = GroupDoneTask & GroupTotalTask;
export declare class TasksService {
    static getTasks: (userId: number, page?: number, countOnPage?: number) => Promise<import("../models").TaskModelShort[]>;
    static getTasksProgress: (userId: number) => Promise<TaskProgress[]>;
    static getTaskGroups: (userId: number) => Promise<import("../models").TaskGroupModel[]>;
    static createTask: (userId: number, content: string, status: TaskStatus, groupId: number) => Promise<unknown>;
    static deleteTask: (taskId: number) => Promise<void>;
    static editTask: (taskId: number, newValues: Partial<TaskCreateModel>) => Promise<unknown>;
}
export {};
