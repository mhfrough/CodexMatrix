import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { DeptService } from 'src/app/services/dept/dept.service';
import { EmpService } from 'src/app/services/emp/emp.service';
import { ViewEmployeesComponent } from '../view-employees/view-employees.component';
import { EmpStatus } from 'src/app/interfaces/emp';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  @ViewChild(ViewEmployeesComponent) users;

  user$: string;

  name: string = '';
  email: string = '';
  manager: string = '';
  department: string = '';
  designation: string = '';
  role: string = '';
  created_at: string = '';
  updated_at: string = '';
  image: string = 'src/assets/images/user.png';

  assignedBy: string = '';

  pendingTotal: number = 0;
  inprogressTotal: number = 0;
  completeTotal: number = 0;
  approveTotal: number = 0;
  totalTasks: number = 0;

  workload: number = 0;
  progress: number = 0;

  skills:any = ['loading skills...'];

  empStatus: any = 'Loading'

  constructor(private route: ActivatedRoute, private task: TaskService,
    private dept: DeptService, private emp: EmpService, private db: AngularFireDatabase) {
    this.route.params.subscribe(params => this.user$ = params.id);
  }

  ngOnInit() {
    this.emp.getEmpDetails(this.user$).subscribe(res => {
      console.log(res)

      this.name = res.data.name;
      this.email = res.data.email
      this.manager = res.data.mgrName;
      this.department = res.data.departmentName;
      this.designation = res.data.designationName;
      this.role = res.data.roleName;
      this.created_at = res.data.created_at;
      this.updated_at = res.data.updated_at;
      // this.image = res.data.image;
      this.skills = res.userSkills;


      console.log(this.skills);
    });

    this.db.object('users/' + this.user$ + '/status')
      .valueChanges().subscribe(action => {
        this.empStatus = action
        console.log(action)
      })



    this.assignedBy = localStorage.getItem('id');
    this.allTasks();

    this.delay(3000).then(any => {
      for (let array of this.task.taskUser) {
        if (array.status == 'pending') {
          this.pendingTotal++;
        }
        if (array.status == 'in-progress') {
          this.inprogressTotal++;
        }
        if (array.status == 'completed') {
          this.completeTotal++;
        }
        if (array.status == 'approved') {
          this.approveTotal++;
        }
      }

      this.workload = (((this.pendingTotal + this.inprogressTotal) / this.task.taskUser.length) * 100);
      this.progress = (((this.completeTotal + this.approveTotal) / this.task.taskUser.length) * 100);

      console.log(this.workload);
      console.log(this.progress);
    });
  }

  changeStatus(data) {
    this.db.database.ref('users/' + this.user$).update({ status: data })
  }

  allTasks() {
    this.task.taskUser = [];
    this.task.getUserTask(this.user$, "d442599c-c4e7-11e8-941d-d0bf9ce16c80");
    this.task.getUserTask(this.user$, "fd1783d9-c4e7-11e8-941d-d0bf9ce16c80");
    this.task.getUserTask(this.user$, "d442919d-c4e7-11e8-941d-d0bf9ce16c80");
    this.task.getUserTask(this.user$, "f1bc127a-c4e7-11e8-941d-d0bf9ce16c80");
    this.task.getUserTask(this.user$, "f1bc2bcc-c4e7-11e8-941d-d0bf9ce16c80");
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
}
