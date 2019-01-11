import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as g from '../../app.globals';
import { CatReq, CatPut, CatDel } from '../../interfaces/cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  catList: any[] = [];
  // all category in one list
  _CatList: String[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

  getCat(data: String) {
    this.catList = [];
    return this.http.get<any>(g.apiURL + '/get-project-categories?deptId=' + data)
      .subscribe(res => {
        console.log(res);
        res.data.forEach(element => {
          this.catList.push(element);
        });
      })
  }

  createCat(data: CatReq) {
    return this.http.post<any>(g.apiURL + '/create-project-category', data);
  }

  updateCat(data: CatPut) {
    return this.http.post<any>(g.apiURL + '/update-project-category', data);
  }

  deleteCat(data: CatDel) {
    return this.http.post<any>(g.apiURL + '/delete-project-category', data);
  }

}
