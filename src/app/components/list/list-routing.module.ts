import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'page',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'detail/:name',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
