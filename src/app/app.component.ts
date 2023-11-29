import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  email: any;
  constructor(private router: Router) {

  }

  ngDoCheck(): void {
    this.email = localStorage.getItem('email');
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
