import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as g from 'src/app/app.globals';
import { ProjReq, ProjPut, ProjDel, EmpProjReq, EmpProjDel } from 'src/app/interfaces/proj';

@Injectable({
  providedIn: 'root'
})
export class ProjService {

  projList: any[] = [];
  projMembersList: any[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

  getProj(data: String) {
    console.log(data);
    this.projList = [];
    return this.http.get<any>(g.apiURL + '/get-projects-by-department?deptId=' + data
    ).subscribe(res => {
      console.log(res);
      res.data.forEach(element => {
        this.projList.push(element);
      });
    })
  }

  getProjDetails(data: string) {
    return this.http.get<any>(g.apiURL + '/get-project-details?projectId=' + data);
  }

  assignTaskAutomatically(data: any) {
    console.log(data)
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

    
    return this.http.post<any>(g.apiURL + '/automatic-task-assign', data, {headers: headers});
  }

  getProjMembers(data: String) {
    console.log(13);
    this.projMembersList = [];
    return this.http.get<any>(g.apiURL + '/get-project-members?projId=' + data
    ).subscribe(res => {
      console.log(222);
      console.log(res);
      res.data.forEach(element => {
        this.projMembersList.push(element);
        // this.projList.find(x => x.id == data).push(element) ;
      });
    })
  }

  createProject(data: ProjReq) {
    console.log(data);
    return this.http.post<any>(g.apiURL + '/create-project', data);
  }

  updateProject(data: ProjPut) {
    return this.http.post<any>(g.apiURL + '/update-project', data);
  }

  deleteProject(data: ProjDel) {
    return this.http.post<any>(g.apiURL + '/delete-project', data);
  }

  // Assign Employee
  assignEmp(data: EmpProjReq) {
    console.log(data);
    return this.http.post<any>(g.apiURL + '/assign-emp-to-project', data);
  }

  deleteEmp(data: EmpProjDel) {
    return this.http.post<any>(g.apiURL + '/delete-emp-from-project', data);
  }
}
