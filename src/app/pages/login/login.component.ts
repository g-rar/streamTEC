import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private auth:AuthService,private router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  submitLogin(formData){
    this.auth.logInWithEmailAndPassword(formData.email, formData.password)
    .then(()=>this.router.navigate(['/']))
    .catch(err => console.error(err))
  }
}
