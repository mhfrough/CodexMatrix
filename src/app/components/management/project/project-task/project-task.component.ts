import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppComponent } from 'test/CodexMatrix/src/app/app.component';
import { ProjService } from 'src/app/services/proj/proj.service';
import { TaskService } from 'test/CodexMatrix/src/app/services/task/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeptService } from 'test/CodexMatrix/src/app/services/dept/dept.service';
import { EmpService } from 'src/app/services/emp/emp.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { NotificationMessage } from 'src/app/interfaces/firebase';
import { FirebaseService } from 'test/CodexMatrix/src/app/services/fbase/firebase.service';
import { AssigTaskReq } from 'test/CodexMatrix/src/app/interfaces/task';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit {

  project$: string;
  projectName: string = '';
  projectDescription: string = '';
  projectMembers: number = 0;
  projectTasks: number = 0;
  projectMembersList: any;

  isOpen: boolean = false;
  modalRef: BsModalRef;
  taskID: string = '';

  constructor(
    // public app: AppComponent,
    public route: ActivatedRoute,
    public router: Router,
    public proj: ProjService,
    public task: TaskService,
    public emp: EmpService,
    private modalService: BsModalService,
    public firebase: FirebaseService
  ) {
    this.route.params.subscribe(params => this.project$ = params.id);
  }

  ngOnInit() {
    this.task.getTask(this.project$);
    this.proj.getProjDetails(this.project$).subscribe(res => {
      if (res.status == 1) {
        this.projectName = res.data.projectDetails.name;
        this.projectDescription = res.data.projectDetails.description;
        this.projectMembers = res.data.projectMembers.length;
        this.projectMembersList = res.data.projectMembers;
        this.delay(3000).then(() => {
          this.emp.getEmp(res.data.projectDetails.deptId, false);
        });
      }
    });

  }

  assignTaskAutomatically() {
    this.proj.assignTaskAutomatically({ projId: this.project$, userId: localStorage.getItem('id') })
      .subscribe(res => {
        console.log(res);
      });
  }

  responeMessage: string = '';
  taskName;
  fbase: NotificationMessage;
  assigTaskReq: AssigTaskReq;

  taskAssignment(id: string) {
    this.responeMessage = 'Waiting...'

    this.fbase = {
      id: this.taskID,
      title: "Task Assignment",
      message: localStorage.getItem('name') + " assigned you a new task",
      from: localStorage.getItem('id'),
      status: "un-read",
      icon: "list_alt"
    }

    this.assigTaskReq = {
      taskId: this.taskID,
      givenBy: localStorage.getItem('id').toString(),
      givenTo: id
    }

    this.task.assignTask(this.assigTaskReq).subscribe(res => {
      console.log(res);
      if (res.status == 1) {
        // this.firebase.notification(id, this.fbase).then(() => this.app.pushNotification("Task Assignment", "You have been assigned to " + this.taskName + " by " + localStorage.getItem('name')));
        this.responeMessage = "Task Assign Successfully!"
      } else {
        this.responeMessage = "Error!"
      }
    })


    this.modalRef.hide();

  }

  toggleOpen = () => this.isOpen = !this.isOpen;

  openModal(template: TemplateRef<any>, taskID: string) {
    this.modalRef = this.modalService.show(template);
    this.taskID = taskID;
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

}
