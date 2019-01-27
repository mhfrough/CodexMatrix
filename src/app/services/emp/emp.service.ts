import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as g from 'src/app/app.globals';
import { EmpReq, EmpPut, EmpDel } from 'src/app/interfaces/emp';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  empList: any[] = [];
  empListA: any[] = [];
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

  getEmpDetails(data: string) {
    return this.http.get<any>(g.apiURL + '/get-emp-details?userId=' + data)
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
    const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    return this.http.post<any>(g.apiURL + '/add-empl-to-dept', data);
  }
  // {
  //   headers: new HttpHeaders({ "Accept": "application/json" })
  // }

  updateEmp(data: EmpPut) {
    return this.http.post<any>(g.apiURL + '/update-emp-in-dept', data);
  }

  deleteEmp(data: EmpDel) {
    return this.http.post<any>(g.apiURL + '/delete-emp-from-dept', data);
  }

}
