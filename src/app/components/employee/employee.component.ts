import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { CoreService } from 'src/app/core/core.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: EmployeeService, private _coreService: CoreService,
    private router: Router) {

  }

  ngOnInit(): void {
    console.log('Checking');
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCofirmDelete(enterAnimationDuration: string, exitAnimationDuration: string, data: any): void {
    const dialogRef = this._dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }

  // deleteEmployee(id: number) {
  //   this._empService.deleteEmployee(id).subscribe({
  //     next: (res) => {
  //       this._coreService.openSnackBar('Employee deleted!', 'Done')
  //       this.getEmployeeList();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
