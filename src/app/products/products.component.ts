import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: any=[];
  APIURL = "http://127.0.0.1:8000"
 constructor(private http:HttpClient){
  }
  Name!: string;
  Manufacturer!: string;
  PurchasePrice!: number;
  Style!: string;
  SalePrice!: number;
  QtyOnHand!: number;
  CommissionPercentage!: number;


  ngOnInit(): void {
    this.get_all_salespersons()

  }
  get_all_salespersons(){
    this.http.get(this.APIURL+"/all_products").subscribe((res)=>{
      this.products = res;
    })
  }
  addProduct(): Observable<any> {
    const body = {
      Name: this.Name,
      Manufacturer: this.Manufacturer,
      PurchasePrice: this.PurchasePrice,
      Style: this.Style,
      SalePrice: this.SalePrice,
      QtyOnHand: this.QtyOnHand,
      CommissionPercentage: this.CommissionPercentage
    };
    const url = `${this.APIURL}/products?Name=${encodeURIComponent(this.Name)}&Manufacturer=${encodeURIComponent(this.Manufacturer)}&style=${encodeURIComponent(this.Style)}&PurchasePrice=${encodeURIComponent(this.PurchasePrice)}&SalePrice=${encodeURIComponent(this.SalePrice)}&QtyOnHand=${encodeURIComponent(this.QtyOnHand)}&CommissionPercentage=${encodeURIComponent(this.CommissionPercentage)}`;
    return this.http.post(url, body);
  }
  save(): void{
    this.addProduct().subscribe(
      (res: any) => {
        alert('Database updated successfully!');
      },
      (error) => {
          alert('Error updating database: ' + error.message);
      }
    );
    
    this.get_all_salespersons()
  }
  update_product(): Observable<any> {
    const body = {
        Name: this.Name,
        Manufacturer: this.Manufacturer,
        PurchasePrice: this.PurchasePrice,
        Style: this.Style,
        SalePrice: this.SalePrice,
        QtyOnHand: this.QtyOnHand,
        CommissionPercentage: this.CommissionPercentage
    };
    const queryParams = [
        this.Name ? `Name=${encodeURIComponent(this.Name)}` : null,
        this.Manufacturer ? `Manufacturer=${encodeURIComponent(this.Manufacturer)}` : null,
        this.PurchasePrice ? `PurchasePrice=${encodeURIComponent(this.PurchasePrice)}` : null,
        this.Style ? `Style=${encodeURIComponent(this.Style)}` : null,
        this.SalePrice ? `SalePrice=${encodeURIComponent(this.SalePrice)}` : null,
        this.QtyOnHand ? `QtyOnHand=${encodeURIComponent(this.QtyOnHand)}` : null,
        this.CommissionPercentage ? `CommissionPercentage=${encodeURIComponent(this.CommissionPercentage)}` : null
    ].filter(param => param != null).join('&');
    
    const url = `${this.APIURL}/products?${queryParams}`;
    return this.http.put(url, body);
}
update(): void{
  this.update_product().subscribe(
    (res: any) => {
      alert('Database updated successfully!');
    },
    (error) => {
        alert('Error updating database: ' + error.message);
    }
  );
  
  this.get_all_salespersons()
}

  }



