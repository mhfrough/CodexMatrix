import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule, TabsModule, ModalModule, PopoverModule } from 'ngx-bootstrap';
import { FilterPipe } from './app.filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { PushNotificationService } from 'ngx-push-notifications';
import { ChartsModule } from 'ng2-charts';
import {NgxPrintModule} from 'ngx-print';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AnalyticsComponent } from './components/dashboard/analytics/analytics.component';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { SidebarComponent } from './components/core/sidebar/sidebar.component';
import { LoadingComponent } from './components/core/loading/loading.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { DepartmentComponent } from './components/structure/department/department.component';
import { DesignationComponent } from './components/structure/designation/designation.component';
import { CategoryComponent } from './components/structure/category/category.component';
import { SkillsComponent } from './components/structure/skills/skills.component';
import { MessagesComponent } from './components/dashboard/messages/messages.component';
import { ErrorComponent } from './components/core/error/error.component';
import { UserprofileComponent } from './components/dashboard/profile/userprofile/userprofile.component';
import { CompanyprofileComponent } from './components/dashboard/profile/companyprofile/companyprofile.component';
import { NewEmployeeComponent } from './components/management/employee/new-employee/new-employee.component';
import { NewProjectComponent } from './components/management/project/new-project/new-project.component';
import { AssignEmployeeComponent } from './components/management/project/assign-employee/assign-employee.component';
import { AssignTaskComponent } from './components/management/task/assign-task/assign-task.component';
import { ViewEmployeesComponent } from './components/management/employee/view-employees/view-employees.component';
import { NewTaskComponent } from './components/management/task/new-task/new-task.component';
import { EmployeeOverviewComponent } from './components/management/employee/employee-overview/employee-overview.component';
import { EmployeeProfileComponent } from './components/management/employee/employee-profile/employee-profile.component';
import { UpdateEmployeeComponent } from './components/management/employee/update-employee/update-employee.component';
import { ViewProjectsComponent } from './components/management/project/view-projects/view-projects.component';
import { ProjectDetailsComponent } from './components/management/project/project-details/project-details.component';
import { MyTaskComponent } from './components/management/task/my-task/my-task.component';
import { ProfileEditComponent } from './components/dashboard/profile/profile-edit/profile-edit.component';
import { MemoDetailsComponent } from './components/dashboard/memo/memo-details/memo-details.component';
import { MemoComponent } from './components/dashboard/memo/memo/memo.component';
import { AboutTaskComponent } from './components/management/task/about-task/about-task.component';
import { ProjectTaskComponent } from './components/management/project/project-task/project-task.component';

export const environment = {
  apiKey: "AIzaSyADxuml0ThMfs5TrERGUcvyEypqSoXawwk",
  authDomain: "codexmatrix-fyp.firebaseapp.com",
  databaseURL: "https://codexmatrix-fyp.firebaseio.com",
  projectId: "codexmatrix-fyp",
  storageBucket: "codexmatrix-fyp.appspot.com",
  messagingSenderId: "849035146808"
};

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    AnalyticsComponent,
    NavbarComponent,
    SidebarComponent,
    LoadingComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DepartmentComponent,
    DesignationComponent,
    CategoryComponent,
    SkillsComponent,
    MessagesComponent,
    ErrorComponent,
    UserprofileComponent,
    CompanyprofileComponent,
    NewEmployeeComponent,
    ViewEmployeesComponent,
    NewProjectComponent,
    AssignEmployeeComponent,
    AssignTaskComponent,
    NewTaskComponent,
    EmployeeOverviewComponent,
    EmployeeProfileComponent,
    UpdateEmployeeComponent,
    ViewProjectsComponent,
    ProjectDetailsComponent,
    MyTaskComponent,
    ProfileEditComponent,
    MemoComponent,
    MemoDetailsComponent,
    AboutTaskComponent,
    ProjectTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    NgSelectModule,
    FormsModule,
    TabsModule.forRoot(),
    AngularFireModule.initializeApp(environment),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    TagInputModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    ChartsModule,
    NgxPrintModule,
  ],
  providers: [PushNotificationService],
  bootstrap: [AppComponent],
  exports: [
    FilterPipe,
  ],
})
export class AppModule { }
