import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { DepartmentComponent } from './components/structure/department/department.component';
import { MessagesComponent } from './components/dashboard/messages/messages.component';
import { CategoryComponent } from './components/structure/category/category.component';
import { SkillsComponent } from './components/structure/skills/skills.component';
import { DesignationComponent } from './components/structure/designation/designation.component';
import { AnalyticsComponent } from './components/dashboard/analytics/analytics.component';
import { ErrorComponent } from './components/core/error/error.component';
import { AuthGuard } from './app.auth.guard';
import { TaskComponent } from './components/management/task/task/task.component';
import { TaskOverviewComponent } from './components/management/task/task-overview/task-overview.component';
import { NewEmployeeComponent } from './components/management/employee/new-employee/new-employee.component';
import { EmployeeProfileComponent } from './components/management/employee/employee-profile/employee-profile.component';
import { ViewEmployeesComponent } from './components/management/employee/view-employees/view-employees.component';
import { NewProjectComponent } from './components/management/project/new-project/new-project.component';
import { AssignTaskComponent } from './components/management/task/assign-task/assign-task.component';
import { AssignEmployeeComponent } from './components/management/project/assign-employee/assign-employee.component';
import { NewTaskComponent } from './components/management/task/new-task/new-task.component';
import { UpdateEmployeeComponent } from './components/management/employee/update-employee/update-employee.component';
import { ViewProjectsComponent } from './components/management/project/view-projects/view-projects.component';
import { ProjectDetailsComponent } from './components/management/project/project-details/project-details.component';
import { MyTaskComponent } from './components/management/task/my-task/my-task.component';
import { UserprofileComponent } from './components/dashboard/profile/userprofile/userprofile.component';
import { ProfileEditComponent } from './components/dashboard/profile/profile-edit/profile-edit.component';
import { MemoComponent } from './components/dashboard/memo/memo/memo.component';
import { MemoDetailsComponent } from './components/dashboard/memo/memo-details/memo-details.component';

const routes: Routes = [
  // Dashboard Section
  { path: '', component: AnalyticsComponent, canActivate: [AuthGuard] },
  { path: 'messages/chat', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'messages/memo', component: MemoComponent, canActivate: [AuthGuard] },
  { path: 'messages/memo-details', component: MemoDetailsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserprofileComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit/:id', component: ProfileEditComponent, canActivate: [AuthGuard] },
  // Authentication Section
  { path: 'authentication/login', component: LoginComponent },
  { path: 'authentication/register', component: RegisterComponent },
  // Structure Section
  { path: 'structure/department', component: DepartmentComponent, canActivate: [AuthGuard] },
  { path: 'structure/category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'structure/skills', component: SkillsComponent, canActivate: [AuthGuard] },
  { path: 'structure/designation', component: DesignationComponent, canActivate: [AuthGuard] },
  // Management Section - update lath link
  { path: 'management/new-employee', component: NewEmployeeComponent },
  { path: 'employee/:id', component: EmployeeProfileComponent },
  { path: 'management/update-employee/:id', component: UpdateEmployeeComponent },
  { path: 'management/view-employees', component: ViewEmployeesComponent },
  { path: 'management/new-project', component: NewProjectComponent },
  { path: 'project/view-projects', component: ViewProjectsComponent },
  { path: 'project/:id', component: ProjectDetailsComponent },
  { path: 'management/assign-employee', component: AssignEmployeeComponent },
  { path: 'management/assign-task', component: AssignTaskComponent },
  { path: 'management/task/new-task', component: NewTaskComponent },
  // Management Section + Task
  { path: 'management/task/task', component: TaskComponent },
  { path: 'management/task/task-overview', component: TaskOverviewComponent },
  { path: 'task/my-tasks', component: MyTaskComponent},

  //Error Section
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }