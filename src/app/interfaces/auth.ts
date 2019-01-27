import { TaskComponent } from "../components/management/task/task/task.component";

// Login Service and Component
export interface LoginReq {
    email: String,
    password: String,
    deviceType: String,
    deviceToken: String
}

// Register Service and Component
export interface RegisterReq {
    name: String,
    email: String,
    domainId: String,
    password: String,
    deviceType: String,
    deviceToken: String
}

export interface FireAuth {
    id: string
}