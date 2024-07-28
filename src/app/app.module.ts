import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SalespersonsComponent } from './salespersons/salespersons.component';

@NgModule({
  declarations: [
    SalespersonsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [SalespersonsComponent] 
})
export class SalesModule { }