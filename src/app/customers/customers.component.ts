import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers: any=[];
  APIURL = "http://127.0.0.1:8000"
 constructor(private http:HttpClient){
  }

  ngOnInit(): void {
    this.get_all_customers()
  }
  get_all_customers(){
    this.http.get(this.APIURL+"/all_customers").subscribe((res)=>{
      this.customers = res;
    })
  }


} 
