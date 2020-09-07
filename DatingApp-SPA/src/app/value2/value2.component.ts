import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value2',
  templateUrl: './value2.component.html',
  styleUrls: ['./value2.component.css']
})
export class Value2Component implements OnInit {

  newValue = '';
  url = '';
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:5000/api/values';
  }

  ngOnInit() {
  }

  postValue()
  {
    // this.http.post(this.url, ).subscribe(
    //   response =>
    //   {
    //   console.log(this.newValue);
    //   },
    //   error =>
    //   {
    //     console.log(error());
    // });
  }

}
