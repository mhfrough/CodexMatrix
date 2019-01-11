export interface TaskReq {
    projId: String,
    name: String,
    description: String,
    estimated_time: String,
    priority: String,
    required_skills: String
    taskCreatorId: String
}

export interface TaskPut {
    taskId: String,
    name: String,
    description: String,
    required_skills: String,
    estimated_time: String,
    priority: String
}

export interface TaskAct {
    taskId
}

// Assign Task
export interface AssigTaskReq {
    taskId: String,
    givenBy: String,
    givenTo: String
}

//  Task Action
export interface TaskStatus {
    userId: string,
    taskId: string,
    statusId: string
}

