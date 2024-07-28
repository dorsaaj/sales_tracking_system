import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {
  ProductName!: string
  ProductManufacturer!: string
  SalespersonFirstName !: string 
  SalespersonLastName !: string 
  CustomerFirstName !: string 
  CustomerLastName !: string
  SalesDate!: string

  sales: any=[];
  APIURL = "http://127.0.0.1:8000"
 constructor(private http:HttpClient){
  }
  ngOnInit(): void {
    this.get_all_sales()

  }
  get_all_sales(){
    this.http.get(this.APIURL+"/all_sales").subscribe((res)=>{
      this.sales = res;
    })
  }
  addSalesRecord(): Observable<any> {
    const body = {
      ProductName: this.ProductName,
      ProductManufacturer: this.ProductManufacturer,
      SalespersonFirstName: this.SalespersonFirstName,
      SalespersonLastName: this.SalespersonLastName,
      CustomerFirstName: this.CustomerFirstName,
      CustomerLastName: this.CustomerLastName,
      SalesDate: this.SalesDate
    };
    const url = `${this.APIURL}/sales?ProductName=${encodeURIComponent(this.ProductName)}&ProductManufacturer=${encodeURIComponent(this.ProductManufacturer)}&SalespersonFirstName=${encodeURIComponent(this.SalespersonFirstName)}&SalespersonLastName=${encodeURIComponent(this.SalespersonLastName)}&CustomerFirstName=${encodeURIComponent(this.CustomerFirstName)}&CustomerLastName=${encodeURIComponent(this.CustomerLastName)}&SalesDate=${encodeURIComponent(this.SalesDate)}`;
    return this.http.post(url, body);
  }
  save(): void{
    this.addSalesRecord().subscribe(
      (res: any) => {
        alert('Database updated successfully!');
      },
      (error) => {
          alert('Error updating database: ' + error.message);
        
      }
    );
    this.addSalesRecord()
  }

} 