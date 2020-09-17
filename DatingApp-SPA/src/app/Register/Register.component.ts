import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authservice: AuthService,
    private alertifyservice: AlertifyService
    ) { }

  ngOnInit() {
  }

  register(){
    this.authservice.register(this.model).subscribe(() => {
      // console.log('registration successful');
      this.alertifyservice.success('registration successful');
    }, error => {
      this.alertifyservice.error(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    this.alertifyservice.message('Cancelled');
  }

}
