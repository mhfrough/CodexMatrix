import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as g from 'src/app/app.globals';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolList: String[] = [];
  constructor(private http: HttpClient) { }

  getRole() {
    this.rolList = [];
    return this.http.get<any>(g.apiURL + '/get-roles')
      .subscribe(res => {
        res.data.forEach(element => {
          this.rolList.push(element);
        });
      });
  }
}
