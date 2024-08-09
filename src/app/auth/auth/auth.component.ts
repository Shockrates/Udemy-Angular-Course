import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private authService: AuthService){}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

 

  onSubmit(form: NgForm){
    
    if (!form.valid) {
        return
    }

    const { email, password} :{ email:string, password: string} = form.value
    //console.log(email, password);
    if (this.isLoginMode) {
    
    } else {
      this.authService.signup(email, password).subscribe(
        resp => {
          console.log(resp);
        },
        error => {
          console.log(error);
          
        })
    }
    
   
    form.reset();
  }
}
