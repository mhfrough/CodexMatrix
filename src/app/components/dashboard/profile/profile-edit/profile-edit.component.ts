import { Component, OnInit } from '@angular/core';
export interface AutoCompleteModel {
  value: any;
  display: string;
}
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  constructor() { }
  public items = ['Pizza', 'Pasta', 'Parmesan'];
  ngOnInit() {
  }

}
