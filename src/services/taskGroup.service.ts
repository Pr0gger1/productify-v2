import {
	getDoc,
	doc,
	setDoc,
	updateDoc,
	DocumentData,
} from 'firebase/firestore';
import { db } from 'firebase.config';

import { generateUniqueId } from 'utils/generateUniqueId';
import { initialGroup } from 'store/defaultData/baseGroups';
import { ITaskGroup } from 'types/TaskData';
import customGroupDefaultIcon from 'assets/img/icons/default/custom_group_task_icon.svg';

export interface TaskGroupsWithSelected {
	taskGroups: ITaskGroup[];
	selectedTaskGroup: ITaskGroup;
}

export class TaskGroupService {
	static async getTaskGroups(userId: string): Promise<DocumentData> {
		const groupDoc = doc(db, 'tasks', userId);
		const groupData = await getDoc(groupDoc);

		if (groupData.exists()) return groupData.data();
		else {
			await setDoc(doc(db, 'tasks', userId), {
				taskData: [],
				taskGroups: [],
			});
			return { taskGroups: [] };
		}
	}

	static async updateTaskGroups(
		groups: ITaskGroup[],
		userId: string,
	): Promise<void> {
		await updateDoc(doc(db, 'tasks', userId), {
			taskGroups: groups,
		});
	}

	static createCustomGroup(
		groups: ITaskGroup[],
		groupName: string,
	): ITaskGroup[] {
		const newGroups: ITaskGroup[] = [...groups];

		newGroups.push({
			title: groupName,
			icon: customGroupDefaultIcon,
			id: generateUniqueId('task_group', 12, true),
			pageTitle: groupName,
			webTitle: `Productify - ${groupName}`,
			counter: 0,
		});

		return newGroups;
	}

	static deleteTaskGroup(
		groups: ITaskGroup[],
		groupId: string,
	): TaskGroupsWithSelected {
		return {
			taskGroups: [...groups].filter(
				(group: ITaskGroup) => group.id !== groupId,
			),
			selectedTaskGroup: initialGroup,
		};
	}

	static editTaskGroup(
		groups: ITaskGroup[],
		groupData: ITaskGroup,
	): TaskGroupsWithSelected {
		const newGroups: ITaskGroup[] = [...groups];
		const groupIndex: number = newGroups.findIndex(
			(group: ITaskGroup) => group.id === groupData.id,
		);

		if (groupIndex !== -1) {
			newGroups[groupIndex] = groupData;
			return {
				taskGroups: newGroups,
				selectedTaskGroup: groupData,
			};
		}
		return { taskGroups: [], selectedTaskGroup: groupData };
	}
}
