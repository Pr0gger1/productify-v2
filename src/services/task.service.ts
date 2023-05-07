import {db} from "../firebase.config";
import {doc, DocumentData, getDoc, setDoc, updateDoc} from "firebase/firestore"
import {ISubTask, ITask, IUserTaskData} from "../interfaces/TaskData";

export interface TasksWithSelected {
    tasks: ITask[],
    selectedTask: ITask | null
}

export class TaskService {
    static async updateUserTasks(tasks: ITask[], userId: string): Promise<void> {
        await updateDoc(doc(db, "tasks", userId), {
            taskData: tasks
        });
    }

    static async getUserTasks(userId: string): Promise<IUserTaskData> {
        const taskDoc = doc(db, "tasks", userId);
        const docSnap = await getDoc(taskDoc);

        let userTasks: IUserTaskData;
        if (docSnap.exists()) {
            const data: DocumentData = docSnap.data();
            userTasks = {
                taskData: data?.taskData,
                taskGroups: data?.taskGroups
            };
            return userTasks;
        }
        else {
            await setDoc(doc(db, "tasks", userId), {
                taskData: [],
                taskGroups: []
            });
            return {taskData: null, taskGroups: null};
        }
    }

    static addTask(tasks: ITask[], taskData: ITask): ITask[] {
        const newTask: ITask = {...taskData}
        // newTask.id = generateUniqueId("task", 12, true);

        let newTasks: ITask[] = [...tasks];
        newTasks.push(newTask);
        
        return newTasks;
    }

    static deleteTask(tasks: ITask[], taskId: string): ITask[] {
        if (tasks.length)
            return tasks.filter((task: ITask) => task.id !== taskId);
        return tasks;
    }

    static deleteSubTask(tasks: ITask[], taskId: string, subTaskId: string): TasksWithSelected {
        let newTasks: ITask[] = [...tasks];
        const taskIndex: number = newTasks.findIndex(
            (task: ITask) => task.id === taskId
        );

        const filteredTasks: ISubTask[] = newTasks[taskIndex].subTasks.filter(
            (task: ISubTask) => task.id !== subTaskId
        );

        newTasks[taskIndex] = {
            ...newTasks[taskIndex],
            subTasks: filteredTasks
        };

        return {tasks: newTasks, selectedTask: newTasks[taskIndex]};
    }

    static updateTask(tasks: ITask[], taskData: ITask): TasksWithSelected {
        let newTasks: ITask[] = [...tasks];

        const taskIndex: number = newTasks.findIndex(
            (task: ITask) => task.id === taskData.id
        );

        if (taskIndex !== -1) {
            newTasks[taskIndex] = taskData;
            return {tasks: newTasks, selectedTask: taskData};
        }
        return {tasks: newTasks, selectedTask: taskData};
    }

    static updateSubTask(tasks: ITask[], taskId: string, subTaskId: string, subTaskData: ISubTask): TasksWithSelected {
        let newTasks: ITask[] = [...tasks];

        const parentTaskIndex: number = newTasks
            .findIndex((task: ITask) => task.id === taskId);

        const subTaskIndex: number = newTasks[parentTaskIndex].subTasks
            .findIndex((subTask: ISubTask) => subTask.id === subTaskId);

        // обходим readonly ограничение для subTasks
        const newSub: ISubTask[] = [...newTasks[parentTaskIndex].subTasks]
        newSub[subTaskIndex] = {...subTaskData};

        const newCurrentTask: ITask = {...newTasks[parentTaskIndex], subTasks: newSub}
        newTasks[parentTaskIndex] = {...newCurrentTask}

        return {
            tasks: newTasks,
            selectedTask: newTasks[parentTaskIndex]
        };
    }
}