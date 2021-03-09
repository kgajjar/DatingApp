import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating app';

  //This is how we turn off type safety. Users can be anything.
  users: any;

  //Http service to make this request
  constructor(private http: HttpClient) { }

  //Implement OnInit
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    //We must add subscribe to get our data and know what to do after data retrieved.
    this.http.get('https://localhost:5001/api/users').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }
}
