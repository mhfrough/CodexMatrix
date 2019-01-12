import { Component, OnInit } from '@angular/core';
import { EmpService } from 'src/app/services/emp/emp.service';
import { AppComponent } from 'src/app/app.component';
import { EmpDel } from 'src/app/interfaces/emp';
import { Router } from '@angular/router';
import { DeptService } from 'src/app/services/dept/dept.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  public searchString: string;
  isLoading: Boolean = false;
  empDel: EmpDel;
  id: string = '';
  departmantName: string = '';
  alerts: any[] = [];

  users: string;

  constructor(public emp: EmpService, public app: AppComponent,
    public router: Router, public dept: DeptService) { }

  ngOnInit() {
    this.dept.getDept();
    // this.emp.getAllEmp(localStorage.getItem('companyID'));
    this.delay(3000).then(any => {
      this.oneForAll();
      // console.log(this.emp.allEmpList.find(x => x.id == "b6CSRdxGw86FoVvg8qf8eKU5H97HdHUWczK6").name);
    });

    // this.getDepeartment("5vIxjxddSLLyASIhJmRy58LbAFFwdH6QJQNp");
  }

  getDepeartment(data: string) {

    // for (let array of this.dept.deptList) {
    //   if(data == array.id){
    //     console.log(array.name)
    //   }
    // }

    this.departmantName = this.dept.deptList.find(x => x.id == data).name;
    console.log(this.departmantName);

  }


  viewProfile(data: string) {
    this.users = data;
    this.router.navigate(['employee/'+data]);
  }

  oneForAll() {
    for (let array of this.dept.deptList) {
      this.emp.getEmp(array.id, false);
    }
  }

  onUpdate(id: String) {
    this.router.navigate(['/management/update-employee/' + id]);
  }

  onDelete(id: String) {
    console.log(id);
    this.isLoading = true;
    this.empDel = {
      userId: id
    }
    this.emp.deleteEmp(this.empDel).subscribe(res => {
      // Department Deleted
      this.isLoading = false;
      this.alerts.push({
        type: 'danger',
        icon: 'report',
        msg: `${res.message}`,
        timeout: 5000
      });
    })

  }

  sortDesc() {
    this.emp.allEmpList = this.emp.allEmpList.sort((a, b) => 0 - (a > b ? -1 : 1));
  }

  sortAsc() {
    this.emp.allEmpList = this.emp.allEmpList.sort((a, b) => 0 - (a > b ? 1 : 1));
  }

  sortByName() {
    this.emp.allEmpList.sort(function (a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }

  sortByDepartment() {
    this.emp.allEmpList.sort(function (a, b) {
      var nameA = a.departmentName.toUpperCase(); // ignore upper and lowercase
      var nameB = b.departmentName.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }

  sortByRole() {
    this.emp.allEmpList.sort(function (a, b) {
      var nameA = a.role.toUpperCase(); // ignore upper and lowercase
      var nameB = b.role.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
}
