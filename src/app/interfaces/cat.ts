export interface CatReq {
    name: String,
    deptId: String
}

export interface CatPut {
    name: String,
    categoryId: String
}

export interface CatDel {
    categoryId: String
}