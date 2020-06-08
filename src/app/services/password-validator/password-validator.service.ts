import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

  constructor() { }

  isPasswordValid(psw1:string, psw2?:string){
    if(psw2){
      if(psw1 !== psw2) {
        return false;
      }
    }
    if(psw1.length < 6) {
      return false;
    }
    let hasNumbers = new RegExp('[0-9]');
    let hasUpper = new RegExp('[A-Z]');
    let hasLower = new RegExp('[a-z]');
    let hasSymbols = new RegExp('[^0-9A-Za-z]');
    if(hasNumbers.test(psw1) && hasUpper.test(psw1) 
          && hasLower.test(psw1) && hasSymbols.test(psw1)){
      return true;
    } else {
      return false;
    }
  }
}
