import { Component, OnInit } from '@angular/core';
import { Validators  , FormBuilder, FormArray } from '@angular/forms';
import { distinctUntilChanged} from 'rxjs/operators';
import { EmailCheck } from '../services/emailCheck.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  

  selectedVersion: string[] = [];
  frameworkArray = ['angular', 'react', 'vue']
  versionFrameworkArray =  {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  }
  developerForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    dateOfBirth: [null, Validators.required],
    framework: [null, Validators.required],
    frameworkVersion: [{value: null,disabled: true}, Validators.required],
    email: [null, [Validators.required, Validators.email], [this.emailCheck.emailAsyncValidator()]],
    hobby:this.fb.array([
      this.fb.group({
          name: [null, Validators.required],
          duration: [null, [Validators.required]]
        })
    ])
  });


  constructor(
    private fb: FormBuilder,
    private emailCheck: EmailCheck
  ) { }

  ngOnInit() {
    this.developerForm.valueChanges
    .pipe(distinctUntilChanged((prev, curr) => prev.framework === curr.framework))
    .subscribe(
      (values) => {
        if(values.framework !== null) {

          this.selectedVersion =  this.versionFrameworkArray[values.framework]
          this.developerForm.controls['frameworkVersion'].enable()

        }
      }
    );
  }



  submitForm(){
    console.log(this.developerForm.value)
  }

  //* get link to controler "Hobby" from developerForm
  get hobbies() {
    return this.developerForm.get('hobby') as FormArray;
  }


  //* push new item to Formbuilder controler "Hobby" from developerForm
  addHobby(): void {
    this.hobbies.push(this.fb.group({
      name: [null, Validators.required],
      duration: [null, [Validators.required]]
    }))
  }

  //* delete new item to Formbuilder controler "Hobby" from developerForm
  deleteHobby( index:number ): void {
    if(this.hobbies.controls.length !== 1)
    this.hobbies.controls.splice(index, 1)
  }
  //* required validation on field 
  isFieldValid(field: string): boolean {
    return !this.developerForm.get(field).valid && this.developerForm.get(field).touched;
  }


}
