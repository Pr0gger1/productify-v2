import { useMemo } from "react";

function sortTasks(a, b, desc = true) {
    if (!desc) {
        let temp = a;
        a = b;
        b = temp;
    }

    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
}

const useFilteredTasks = (groupTasks, filter) => {
    return useMemo(() => {
        if (filter.type === 'alphabet')
            return [...groupTasks].sort(
            (a, b) => sortTasks(
                a.taskName, b.taskName, filter.desc
            )
        );
        else if (filter.type === 'created_at')
            return [...groupTasks].sort(
            (a, b) => sortTasks(
                a.createdAt, b.createdAt, filter.desc
            )
        );
        else return [...groupTasks].sort(
            (a, b) => sortTasks(
                a.favorite, b.favorite, filter.desc
            )
        );

    }, [groupTasks, filter]);
}

export default useFilteredTasks;