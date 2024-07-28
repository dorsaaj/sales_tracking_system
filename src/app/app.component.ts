import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SalespersonsComponent } from './salespersons/salespersons.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { SalespersonsAddComponent } from './salespersons-add/salespersons-add.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SalespersonsSearchComponent } from './salespersons-search/salespersons-search.component';
import { SalePersonUpdateComponent } from './sale-person-update/sale-person-update.component';
import { CustomersComponent } from './customers/customers.component';
import { CommisionComponent } from './commision/commision.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,SalespersonsComponent,ProductsComponent,SalesComponent,SalespersonsAddComponent,RouterModule,SalespersonsSearchComponent,SalePersonUpdateComponent,CustomersComponent,CommisionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})

export class AppComponent {
  title = 'sales-tracking_sys';
  constructor(private router: Router) {}

  navigateToAddSalesPerson() {
    this.router.navigate(['/salespersons-add']);
  }

}
