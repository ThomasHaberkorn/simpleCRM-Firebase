import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user-folder/user/user.component';
import { UserDetailComponent } from './user-folder/user-detail/user-detail.component';
import { CustomerDetailComponent } from './customer-folder/customer-detail/customer-detail.component';
import { TaskComponent } from './task-folder/task/task.component';
import { CustomerComponent } from './customer-folder/customer/customer.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user', component: UserComponent},
    {path: 'customer', component: CustomerComponent},
    {path: 'user/:id', component: UserDetailComponent},
    {path: 'customer/:id', component: CustomerDetailComponent},
    {path: 'task', component: TaskComponent}
];
