import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-salespersons',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './salespersons.component.html',
  styleUrl: './salespersons.component.css'
})
export class SalespersonsComponent implements OnInit {
  salespersons: any=[];
  FirstName = '';
  LastName = '';
  APIURL = "http://127.0.0.1:8000"
 constructor(private http:HttpClient){
  }

  ngOnInit(): void {
    this.get_all_salespersons()
  }
  get_all_salespersons(){
    this.http.get(this.APIURL+"/all_salesPerson").subscribe((res)=>{
      this.salespersons = res;
    })
  }


} 