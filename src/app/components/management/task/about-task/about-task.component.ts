import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { TaskService } from 'src/app/services/task/task.service';
import { EmpService } from 'src/app/services/emp/emp.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-about-task',
  templateUrl: './about-task.component.html',
  styleUrls: ['./about-task.component.css']
})
export class AboutTaskComponent implements OnInit {

  task$: string;
  assignedBy: string;

  // Given By User
  givenByDesign: string;
  givenByDepart: string;
  givenByEmail: string;
  givenByStatus: any = 'Loading'

  // Gien To User
  givenToDesign: string;
  givenToDepart: string;
  givenToEmail: string;
  givenToStatus: any = 'Loading'

  constructor(public app: AppComponent, public task: TaskService,
    public route: ActivatedRoute, public router: Router, public emp: EmpService,
    private db: AngularFireDatabase) {
    this.route.params.subscribe(params => this.task$ = params.id)
  }

  ngOnInit() {
    console.log(this.task.taskData)
    this.assignedBy = localStorage.getItem('id');

    this.emp.getEmpDetails(this.task.taskData.givenById).subscribe(res => {
      this.givenByDesign = res.data.designationName;
      this.givenByDepart = res.data.departmentName;
      this.givenByEmail = res.data.email;

      this.db.object('users/' + this.task.taskData.givenById + '/status')
        .valueChanges().subscribe(status => {
          this.givenByStatus = status;
        })
    })

    this.emp.getEmpDetails(this.task.taskData.givenToId).subscribe(res => {
      this.givenToDesign = res.data.designationName;
      this.givenToDepart = res.data.departmentName;
      this.givenToEmail = res.data.email;

      this.db.object('users/' + this.task.taskData.givenToId + '/status')
        .valueChanges().subscribe(status => {
          this.givenToStatus = status;
        })
    })
  }

}
