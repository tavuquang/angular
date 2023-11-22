import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee/employee.service';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {

  constructor(private _empService: EmployeeService, private _coreService: CoreService, @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<ConfirmDeleteComponent>) { }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'Done');
      },
      error: (err) => {
        console.log(err);
      }
    });
    this._dialogRef.close(true);
  }
}
