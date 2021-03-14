import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Property
  registerMode = false;

  //To store users we get back from http response
  //users: any;

  constructor() { }

  ngOnInit(): void {
    //this.getUsers();
  }

  registerToggle() {
    //Set to opposite
    this.registerMode = !this.registerMode;
  }

  //getUsers() {
  //  this.http.get('https://localhost:5001/api/users').subscribe(users => this.users = users);//Setting the response we get back to users object.
  //}

  //Gets value from register child component and sets registerMode property
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
