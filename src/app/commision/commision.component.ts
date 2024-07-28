import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-commision',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './commision.component.html',
  styleUrl: './commision.component.css'
})
export class CommisionComponent implements OnInit{
  ngOnInit(): void {
    this.get_all_commisions()

  }
  commision: any=[];
  APIURL = "http://127.0.0.1:8000"
  constructor(private http:HttpClient){
  }
  get_all_commisions(){
    this.http.get(this.APIURL+"/commission ").subscribe((res)=>{
      this.commision = res;
    })
  }

}
