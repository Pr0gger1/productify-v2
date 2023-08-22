import { ISubTask } from '../TaskData';

interface UpdateSubTaskParams {
	taskId: string;
	subTaskId: string;
	subTaskData: ISubTask;
}

export type { UpdateSubTaskParams };
