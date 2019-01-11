import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as g from 'src/app/app.globals';
import { EmpReq, EmpPut, EmpDel } from 'src/app/interfaces/emp';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  empList: any[] = [];
  empListA: String[] = [];
  allEmpList: any[] = [];
  constructor(private http: HttpClient) { }

  getEmp(data: String, cond: Boolean) {
    console.log(data);
    this.empListA = []

    this.empList = [];
    return this.http.get<any>(g.apiURL + '/get-empls-from-dept?deptId=' + data)
      .subscribe(res => {
        console.log(res);
        if (cond) {
          res.data.forEach(element => {
            this.empListA.push(element);
          });
        } else {
          res.data.forEach(element => {
            this.empList.push(element);
          });
        }
      })
  }

  getAllEmp(data: String) {
    this.allEmpList = [];
    return this.http.get<any>(g.apiURL + '/get-all-empls?companyId=' + data)
      .subscribe(res => {
        console.log("get all emp");
        console.log(res);
        res.data.forEach(element => {
          this.allEmpList.push(element);
        });
      })
  }

  createEmp(data: EmpReq) {
    return this.http.post<any>(g.apiURL + '/add-empl-to-dept', data);
  }

  updateEmp(data: EmpPut) {
    return this.http.post<any>(g.apiURL + '/update-emp-in-dept', data);
  }

  deleteEmp(data: EmpDel) {
    return this.http.post<any>(g.apiURL + '/delete-emp-from-dept', data);
  }

}
