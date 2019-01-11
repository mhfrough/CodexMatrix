import { Component, OnInit } from '@angular/core';
import { DesigReq, DesigPut, DesigDel } from 'src/app/interfaces/desig';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DesigService } from 'src/app/services/desig/desig.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  desigReq: DesigReq;
  desigPut: DesigPut;
  desigDel: DesigDel;

  rForm: FormGroup;
  dismissible = true;
  alerts: any[] = [];
  isLoading: Boolean = false;
  id: String = '';
  desigName: String = '';
  button: String = 'Submit';
  isUpdate: boolean = false;
  public searchString: string;

  constructor(public desig: DesigService, public fb: FormBuilder,
    public app: AppComponent) {
    this.rForm = fb.group({
      'desigName': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32)
      ])]
    });
  }

  ngOnInit() {
    this.desig.desigList = [];
    this.getAllDesig();
    this.app.reset();
  }

  sortName() {
    this.desig.desigList = this.desig.desigList.sort((a, b) => 0 - (a.name.rendered > b.name.rendered ? -1 : 1));
  }

  sortDesc() {
    this.desig.desigList= this.desig.desigList.sort((a, b) => 0 - (a > b ? -1 : 1));
  }

  sortAsc() {
    this.desig.desigList = this.desig.desigList.sort((a, b) => 0 - (a > b ? 1 : 1));
  }

  getAllDesig() {
    this.isLoading = true;
    this.desig.getDesig(localStorage.getItem('companyID'));
    this.isLoading = false;
  }

  onSubmit(post) {
    this.isLoading = true;

    if (!this.isUpdate) {
      this.desigReq = {
        companyId: localStorage.getItem('companyID'),
        name: post.desigName,
      }

      this.desig.createDesig(this.desigReq).subscribe(res => {
        if (res.status == 1) {
          this.isLoading = false;
          console.log(res);
          this.alerts.push({
            type: 'success',
            msg: `${res.message}`,
            timeout: 5000
          });
          this.getAllDesig();
        } else {
          this.isLoading = false;
          console.log(res);
          this.alerts.push({
            type: 'warning',
            msg: `${res.message}`,
            timeout: 5000
          });
        }
      });
    } else {
      this.desigPut = {
        companyId: localStorage.getItem('companyID'),
        name: post.desigName,
      }

      this.desig.updateDesig(this.desigPut).subscribe(res => {
        if (res.status == 1) {
          this.isLoading = false;
          console.log(res);
          this.alerts.push({
            type: 'success',
            msg: `${res.message}`,
            timeout: 5000
          });
          this.getAllDesig();
        } else {
          this.isLoading = false;
          console.log(res);
          this.alerts.push({
            type: 'warning',
            msg: `${res.message}`,
            timeout: 5000
          });
        }
      });
    }
    this.rForm.reset();
    this.app.reset();
  }

  onUpdate(id: String, name: String) {
    this.app.button = 'Update';
    this.app.action = 'Update';
    this.id = id;
    this.desigName = name;
    this.isUpdate = true;
  }

  onDelete(id: String) {
    this.isLoading = true;
    this.desigDel = {
      designationId: id
    }
    this.desig.deleteDesig(this.desigDel).subscribe(res => {
      this.isLoading = false;
      // Department Deleted

      this.alerts.push({
        type: 'danger',
        msg: `${res.message}`,
        timeout: 5000
      });
      this.getAllDesig();
      this.rForm.reset();
      this.app.reset();
    })
  }

}
