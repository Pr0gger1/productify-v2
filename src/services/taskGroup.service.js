import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

import { generateUniqueId } from "../utils/generateUniqueId";
import { initialGroup } from "../store/defaultData/baseGroups";
import customGroupDefaultIcon from "../assets/img/icons/default/custom_group_task_icon.svg";


export class TaskGroupService {
    static async getTaskGroups(userId) {
        const groupDoc = doc(db, 'tasks', userId);
        const groupData = await getDoc(groupDoc);

        if (groupData.exists())
            return groupData.data();
        else {
            await setDoc(doc(db, 'tasks', userId), {
                taskData: [],
                taskGroups: []
            })
            return {taskGroups: []};
        }
    }

    static async updateTaskGroups(groups, userId) {
        await updateDoc(doc(db, 'tasks', userId), {
            taskGroups: groups
        });
    }

    static createCustomGroup(groups, groupName) {
        const newGroups = [...groups];

        newGroups.push({
            title: groupName,
            icon: customGroupDefaultIcon,
            id: generateUniqueId('task_group', 12, true),
            pageTitle: groupName,
            webTitle: `Productify - ${groupName}`
        });

        return newGroups;
    }

    static deleteTaskGroup(groups, groupId) {
        return  {
            taskGroups: [...groups].filter(group => group.id !== groupId),
            selectedTaskGroup: initialGroup
        };
    }

    static editTaskGroup(groups, groupData) {
        let newGroups = [...groups];
        const groupIndex = newGroups.findIndex(
            group => group.id === groupData.id
        );
        console.log(groupData)
        console.log(groupIndex)
        if (groupIndex !== -1) {
            newGroups[groupIndex] = groupData;
            return {
                taskGroups: newGroups,
                selectedTaskGroup: groupData
            }
        }
    }
}