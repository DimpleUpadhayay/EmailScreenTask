import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ElementSchemaRegistry } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();
  hide = true;
  usersData: Object;

  constructor(private fb : FormBuilder,
     private route :Router,private apiService:ApiService, private toastr: ToastrService
     ) {

  this.loginForm  = fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(8)]],
    });
   }

   
  ngOnInit() {
   this.getUsersDetails();
  }
  

   /* Handle form errors in Angular Using material */
  getErrorForEmail() {
    return this.loginForm.controls['email'].hasError('required') ? 'You must enter a value' :
        this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' :'';
   }
   getErrorForPassword(){
    return this.loginForm.controls['password'].hasError('required') ? 'You must enter a value' : 
    this.loginForm.controls['password'].hasError('minlength') ? 'Required length is at least 8 characters' : '';
   }

  getUsersDetails(){
      this.apiService.getUsersList().subscribe(
        (data) => {
          this.usersData = data;
        },
        (err) => {
          console.log("errr", err);
        }
      );
    }
    submitLoginForm() {
      if (this.loginForm.valid) {
        this.submitEM.emit(this.loginForm.value);
        console.log("this.loginForm.value",this.loginForm.value)
        if(this.usersData){
          const user = this.usersData.find((user)=>{
            console.log("user",user);
             return user.email === this.loginForm.value.email && user.password === this.loginForm.value.password
          });
          if(user){
            localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbXBsZXVwYWRoYXlheUBnbWFpbC5jb20iLCJpYXQiOjE2NjAwNTI2NzUsImV4cCI6MTY2MzY1MjY3NX0.Sg9xPzp_z3AweqeJdWDmFzvjyqZIYFVEo7lqNx0_uT0")
            this.loginForm.reset();
            this.toastr.success('Logged In');
            this.route.navigate(['home'])
          }
          else{
            this.toastr.error('Please enter correct email and password');
          }
        }
        }
       
    }
}
