interface IBrowserNotification {
	body?: string;
	title: string | undefined;
}

type ITaskNotification = {
	taskName: string;
	type: string;
	message: string;
	id: string;
	taskId: string;
};

export type { IBrowserNotification, ITaskNotification };
