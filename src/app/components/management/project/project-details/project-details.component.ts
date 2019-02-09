import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ProjService } from 'src/app/services/proj/proj.service';
import { TaskService } from 'src/app/services/task/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeptService } from 'src/app/services/dept/dept.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  public searchString: string;
  project$: string;

  // Properties
  name: string;
  description: string;
  department: string;
  category: string;
  taskTotal: number;
  employeeTotal: number;
  created_at: string;
  updated_at: string;

  pendingTotal: number = 0;
  inprogressTotal: number = 0;
  completeTotal: number = 0;
  rejectTotal: number = 0;
  approveTotal: number = 0;
  totalZero: boolean = false;

  constructor(public app: AppComponent, public proj: ProjService, public task: TaskService,
    public dept: DeptService, public route: ActivatedRoute, public router: Router) {
    this.route.params.subscribe(params => this.project$ = params.id);
  }


  assignTaskAutomatically() {
    this.proj.assignTaskAutomatically({ projId: this.project$, userId: localStorage.getItem('id') })
      .subscribe(res => {
        console.log(res)
      });
  }

  ngOnInit() {
    if (!this.app.isSoftwareHouse) this.router.navigate(['']);
    this.task.getTask(this.project$);
    this.proj.getProjMembers(this.project$);
    this.proj.getProjDetails(this.project$).subscribe(res => {
      console.log(res);
      this.name = res.data.projectDetails.name;
      this.description = res.data.projectDetails.description;
      this.department = res.data.projectDetails.departmentName;
      this.category = res.data.projectDetails.categoryName;
      // this.taskTotal = res.data.projectDetails.
      this.created_at = res.data.projectDetails.created_at;
      this.updated_at = res.data.projectDetails.updated_at;
    });

    this.delay(3000).then(any => {

      this.employeeTotal = this.proj.projMembersList.length;
      this.taskTotal = this.task.taskList.length;

      if (this.taskTotal > 0) {
        for (let array of this.task.taskList) {
          if (array.taskStatus == 'pending') {
            this.pendingTotal++;
          }
          if (array.taskStatus == 'in-progress') {
            this.inprogressTotal++;
          }
          if (array.taskStatus == 'completed') {
            this.completeTotal++;
          }
          if (array.taskStatus == 'rejected') {
            this.rejectTotal++;
          }
          if (array.taskStatus == 'approved') {
            this.approveTotal++;
          }
        }

        this.doughnutChartData = [this.pendingTotal, this.completeTotal, this.inprogressTotal, this.rejectTotal, this.approveTotal];
      }
    });

  }

  href(data) {
    console.log(data)
    this.router.navigate(['/employee/' + data]);
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }


  // Charts/ Graphs -- bar

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    legend: {
      // position:'bottom',
      labels: {
        fontSize: 12
      }
    },
    scales: {
      yAxes: [{ stacked: true }],
      xAxes: [{ stacked: true },]
    },
    responsive: true
  };
  public barChartLabels: string[] = ['20adsnlknsad06', '2klnsadlkndas007', '20kasdn lkasnd08', '200adslk aksl9'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartColors: any[] = [
    { backgroundColor: '#387bfe' },
    { backgroundColor: '#49a0fe' },
    { backgroundColor: '#7fc7f3' },
    { backgroundColor: '#add4fd' },
  ]

  public barChartData: any[] = [
    { data: [35, 39, 30, 31], label: 'Series A' },
    { data: [28, 28, 20, 29], label: 'Series B' },
    { data: [12, 18, 13, 14], label: 'Series C' },
    { data: [2, 4, 4, 1], label: 'Series D' }
  ];

  // Charts/ Graphs -- doughnut

  public doughnutChartLabels: string[] = ['Pending', 'Inprogress', 'Completed', 'Rejected', 'Approved'];
  public doughnutChartData: number[] = [10, 20, 30, 40, 50]
  public doughnutChartType: string = 'doughnut';
  public doughnutChartOptions: any = {
    scaleShowVerticalLines: false,
    cutoutPercentage: 80,
    legend: {
      display: false
    },
    tooltips: {
      // enabled: false
    }
  }
  public doughnutChartColors: any[] = [{ backgroundColor: ['#ffb400', '#674eec', '#17c671', '#007bff', '#c4183c'] }];
}
