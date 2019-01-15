export interface EmpReq {
    name: String,
    email: String,
    password: String,
    deviceType: String,
    deviceToken: String,
    deptId: String,
    mgr: String,
    roleId: String,
    designationId: String,
    image,
}

export interface EmpPut {
    userId: String,
    name: String,
    email: String,
    deptId: String,
    password: String,
    mgr: String
}

export interface EmpDel {
    userId: String    
}

// Update Employee Designation
export interface EmpDesigPut {
    userId: String,
    designationId: String
}