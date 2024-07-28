// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalespersonsAddComponent } from './salespersons-add/salespersons-add.component';
import { AppComponent } from './app.component';
export const routes: Routes = [
  { path: 'salespersons-add', component: SalespersonsAddComponent }  // Default route
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }