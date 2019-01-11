import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as g from '../../app.globals';
import { SkilReq, SkilDel } from '../../interfaces/skil';

@Injectable({
  providedIn: 'root'
})
export class SkilService {

  skilList: any[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

  getSkill(data: String) {
    console.log("Get Skills")
    this.skilList = [];
    return this.http.get<any>(g.apiURL + '/get-skills-by-dept?deptId=' + data)
      .subscribe(res => {
        console.log(res);
        res.data.forEach(element => {
          this.skilList.push(element);
        });
      })
  }

  createSkill(data: SkilReq) {
    return this.http.post<any>(g.apiURL + '/create-skill', data);
  }

  deleteSkill(data: SkilDel) {
    return this.http.post<any>(g.apiURL + '/delete-skill', data);
  }

}
