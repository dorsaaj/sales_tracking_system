import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesComponent } from '../sales/sales.component';
import { SalespersonsComponent } from '../salespersons/salespersons.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-salespersons-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './salespersons-search.component.html',
  styleUrl: './salespersons-search.component.css'
})
export class SalespersonsSearchComponent {

  salespersons: any=[];
  FirstName = '';
  LastName = '';
  APIURL = "http://127.0.0.1:8000"
 constructor(private http:HttpClient){
  }

  ngOnInit(): void {
  
  }
  search_salespersons(){
    const params = {
      FirstName: this.FirstName,
      LastName: this.LastName
    };
    this.http.get(this.APIURL + "/salespersons", { params }).subscribe((res) => {
      this.salespersons = res;
    });
  }


} 
