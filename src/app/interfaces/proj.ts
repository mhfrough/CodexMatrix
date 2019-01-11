export interface ProjReq {
    name: String,
    description: String,
    projCatId: String,
    deptId: String
}

export interface ProjPut {
    projectId: String,
    name: String,
    description: String,
    projCatId: String
}

export interface ProjDel {
    projectId: String
}


// Assign Employees to Project
export interface EmpProjReq {
    userId: String,
    designationId: String,
    projId: String
}

export interface EmpProjUpd {
    userId: String,
    designationId: String
}

export interface EmpProjDel {
    userId: String
}