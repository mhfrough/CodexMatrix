import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as g from 'src/app/app.globals';
import { DeptReq, DeptPut, DeptDel } from 'src/app/interfaces/dept';

@Injectable({
  providedIn: 'root'
})
export class DeptService {

  deptList: any[] = [];
  constructor(private http: HttpClient) { }
  getDept(data: string) {
    this.deptList = [];
    return this.http.get<any>(g.apiURL + '/get-departments?companyId=' + data
    ).subscribe(res => {
      console.log(res);
      res.data.forEach(element => {
        this.deptList.push(element);
      });
    });
  }

  createDept(data: DeptReq) {
    // this.deptList = [];
    return this.http.post<any>(g.apiURL + '/create-department', data);
  }

  updateDept(data: DeptPut) {
    return this.http.post<any>(g.apiURL + '/update-department', data);
  }

  deleteDept(data: DeptDel) {
    return this.http.post<any>(g.apiURL + '/delete-department', data);
  }

}
