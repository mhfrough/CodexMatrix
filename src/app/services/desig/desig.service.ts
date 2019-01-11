import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as g from '../../app.globals';
import { DesigReq, DesigDel, DesigPut } from '../../interfaces/desig';

@Injectable({
  providedIn: 'root'
})
export class DesigService {

  desigList: any[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

  getDesig(data: String) {
    this.desigList = [];
    return this.http.get<any>(g.apiURL + '/get-designations?companyId=' + data)
    .subscribe(res => {
      res.data.forEach(element => {
        this.desigList.push(element);
      });
    })
  }

  createDesig(data: DesigReq) {
    return this.http.post<any>(g.apiURL + '/create-designation', data)
  }

  updateDesig(data: DesigPut) {
    return this.http.post<any>(g.apiURL + '/create-designation', data)
  }

  deleteDesig(data: DesigDel) {
    console.log(data);
    return this.http.post<any>(g.apiURL + '/delete-designation', data);
  }

}
