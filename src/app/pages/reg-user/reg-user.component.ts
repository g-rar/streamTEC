import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { PasswordValidatorService } from '../../services/password-validator/password-validator.service';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.scss']
})
export class RegUserComponent implements OnInit {

  regUserForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private pswVal:PasswordValidatorService,
    private auth: AuthService,
    private db: FirestoreService,
    private router:Router
    ) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/'])
    }
    this.regUserForm = this.formBuilder.group({
      name:'',
      lastName:'',
      email:'',
      country:'',
      city:'',
      phoneNumber:'',
      direction:'',
      birthDate: '',
      password: '',
      repeatPassword:''
    })
  }

  regBtnSubmit(formData){
    if(formData.name === ''){
      alert("Por favor ingrese un nombre")
    } else if(formData.lastName === ''){
      alert("Por favor ingrese al menos un apellido")
    } else if(formData.email === ''){
      alert("Por favor ingrese un correo electrónico")
    } else if(formData.birthDate === ''){
      alert("Por favor ingrese una fecha de nacimiento")
    } else if(formData.password === ''){
      alert("Por favor ingrese una contraseña")
    } else if(formData.repeatPassword === ''){
      alert("Por favor repita la contraseña")
    }else if(this.pswVal.isPasswordValid(formData.password, formData.repeatPassword)){
      this.auth.registerUserWithEmailAndPassword(formData.email, formData.password)
      .then((d) => {
        let newUser:User = {
          subscription: "demand",
          id: d.user.uid,
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          birthDate: new Date(formData.birthDate),
          city: formData.city,
          country: formData.country,
          direction: formData.direction,
          ownedProducts: []
        }
        this.db.registerUser(newUser).then(()=>{
          this.router.navigate(['/']);
        });
      })
    } else {
      alert("Las contraseñas dadas o no coinciden o no son válidas. Se deben usar usar contraseñas que tengan letras mayúsculas, minúsculas, números y símbolos.")
    }
  }
}
