
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

type ValidationErrors = {
  [key: string]: any;
};

@Injectable({
    providedIn:'root'
})



export class EmailCheck {
 
    constructor() {}
   
    public existEmail(email: string): Observable<boolean>  {
      // simulate request to api
      
      return of( email === 'test2@test.test')
        .pipe()
        .pipe(delay(2000));
    }

    emailAsyncValidator() {
      
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return this.existEmail(control.value).pipe(
          map(res => {
            
            // if res is true, email exists, return true
            return res ? { emailExists: true } : null;
            // NB: Return null if there is no error
          })
        );
      };
    }

}
  