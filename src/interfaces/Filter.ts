interface TaskFilterType {
    type: "alphabet" | "created_at" | "favorite",
    desc: boolean
}

interface FilterStates {
    searchFilter: string,
    taskFilter: TaskFilterType
}

export type {
    TaskFilterType,
    FilterStates
}