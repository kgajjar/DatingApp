import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //Object is null by default
  model: any = {}

  //Bool is false by default
  //loggedIn: boolean;

  //Injecting service here. Injecting router here.
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    //Get current user from account service
    //this.getCurrentUser();
    //this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    //Call the service
    this.accountService.login(this.model).subscribe(response => {

      //Send user to members area
      this.router.navigateByUrl('/members');

      //this.loggedIn = true;
    }, error => {
      //Output toastr
      this.toastr.error(error.error);
    });
  }

  logout() {
    this.accountService.logout();

    //Send user to home page after logout.
    this.router.navigateByUrl('/');
    //this.loggedIn = false;
  }

  //Temperarily
  //getCurrentUser() {
  //  //subscribe to the user service
  //  this.accountService.currentUser$.subscribe(user => {
  //    //!! turns our object into a boolean. If null. then logged out else logged in.
  //    this.loggedIn = !!user;
  //  }, error => {
  //    console.log(error);
  //  });
  //}

}
