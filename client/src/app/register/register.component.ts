import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Input decorator to receive parent communication
  //@Input() usersFromHomeComponent: any;

  //Output decorator to send communication to parent. EventEmitter class.
  @Output() cancelRegistration = new EventEmitter();//EventEmitter allows us to emit value back to parent

  model: any = {};

  //Inject account service in here.
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(response => {

      console.log(response);

      this.cancel();
    }, error => {
        //Output toastr
        this.toastr.error(error.error);
    });
    //console.log(this.model);
  }

  cancel() {
    //Emit a value using event emiitter. Sending value "false" to parent
    this.cancelRegistration.emit(false);
  }

}
