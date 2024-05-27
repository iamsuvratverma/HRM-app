import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit { 

  firstname: string = "";
  lastname: string = "";
  age: string = "";
  num: string = "";
  gender: string = "";
  dpt:string="";
  email: string = "";
  password: string = "";
  intm: string = "";
  outtm: string = "";
  Logoutdate:string = "";
  checkintm:string="";
  checkout:string="" ;
  chechkindate:string="";
  userDetails: any;

  constructor(private http: HttpClient, private router: Router) {} 

  ngOnInit(): void {}

  register(): void {
    if (this.validateForm()) { // Check form validity before proceeding
      let bodyData = {
        "firstname": this.firstname,
        "lastname": this.lastname,
        "email": this.email,
        "age": this.age,
        "num": this.num,
        "dpt":this.dpt,
        "gender": this.gender,
        "password": this.password,
        "intm": this.intm,
        "outtm": this.outtm ,
        "Logoutdate":this.Logoutdate,
        "checkintm":this.checkintm,
        "checkout":this.checkout,
        "chechkindate":this.chechkindate
      };
  
      this.http.post("http://localhost:9992/student/create", bodyData).subscribe(
      (resultData: any) => {
        // Registration successful
        console.log(resultData);
        this.userDetails = resultData;
        alert("Registered Successfully");
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error registering:', error);
        if (error.status === 409) { // Check if error status is 409
          alert("User is already registered.");
        } else {
          // Display the error message returned by the backend, if available
          const errorMessage = error?.error?.message || "Error registering. Please try again.";
          alert(errorMessage);
        }
      }
    );
  } else {
    alert("Please fill all fields correctly before registering.");
  }
  }
  

  validateForm(): boolean {
    // Check if email is empty or not valid
    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      return false; // Return false if email is empty or not valid
    }
    // You can add further validation for other fields if needed
    return true; // Return true if all validations pass
  }

  save(): void {
    this.register();
  }
}
