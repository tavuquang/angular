import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DetailComponent } from './detail/detail.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatGridListModule,
    MatInputModule,
    FormsModule
  ]
})
export class ListModule { }
