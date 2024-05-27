import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { DatePipe } from '@angular/common';
import { CheckinService } from '../checkin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  checkintm:string="";
  errorMessage: string = '';


  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private checkinService: CheckinService // Inject the CheckinService
  ) {}

  login() {
  this.authService.login(this.email, this.password).subscribe(
    (response: any) => {
      if (response && response.token) {
        console.log("Logged in with email:", this.email);
        this.saveLoginTime(); // Save login time
        localStorage.setItem('token', response.token);
        localStorage.setItem('loginDate', new Date().toISOString()); // Save login date
        // Print message indicating JWT token has been generated
        console.log("JWT token generated successfully:", response.token);
        // Redirect to home component after successful login
        this.router.navigate(['/home', this.email], { queryParams: { email: this.email } });
      } else {
        console.log("Error logging in: Invalid token response", response);
      }
    },
    (error) => {
      console.error('Error logging in:', error);
      alert("Incorrect email id & password or Invalid token response");
      // Handle error
      if (error.error && error.error.msg) {
        this.errorMessage = error.error.msg;
      } else {
        this.errorMessage = "Login failed. Please try again.";
      }
    }
  );
}


  saveLoginTime() {
    const now = new Date();

    // Format the time manually
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    // Construct the final datetime string
    const loginDateTime = `${formattedTime}`;
    // Send HTTP request to backend to save the login time
    this.http.post<any>('http://localhost:9992/saveLoginTime', { email: this.email, loginTime: loginDateTime }).subscribe(
      (response: any) => {
        console.log('Login time saved successfully:', response);
      },
      (error) => {
        console.error('Error saving login time:', error);
      }
    );
  }

  // checkin() {
  //   const now = new Date();
  //   let hours = now.getHours();
  //   const minutes = now.getMinutes();
  //   const sec = now.getSeconds();
  //   const ampm = hours >= 12 ? 'pm' : 'am';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // 0 should be converted to 12
  //   const formattedTime = `${hours}:${minutes}:${sec}secs ${ampm}`;
  
  //   const checktm = `${formattedTime}`;
  
  //   // Send HTTP request to backend to save the login time
  //   this.http.post<any>('http://localhost:9992/savecheckintm', { email: this.email, checkintm: checktm }).subscribe(
  //     (response: any) => {
  //       console.log('Check-in time saved successfully:', response);
  
  //       // Update the check-in date to the current date
  //       this.updateCheckInDate(now);
  //     },
  //     (error) => {
  //       console.error('Error saving check-in time:', error);
  //     }
  //   );
  
  // }
  
  // updateCheckInDate(checkindate: Date) {
  //   const formattedDate = checkindate;
  
  //   // Send HTTP request to backend to update the check-in date in the database
  //   this.http.post<any>('http://localhost:9992/savecheckindate', { email: this.email, checkindate: formattedDate }).subscribe(
  //     (response: any) => {
  //       console.log('Check-in date updated successfully:', response);
  //     },
  //     (error) => {
  //       console.error('Error updating check-in date:', error);
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.checkin();
}

checkin() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const sec = now.getSeconds();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be converted to 12
  const formattedTime = `${hours}:${minutes}:${sec}sec ${ampm}`;
  const checktm = `${formattedTime}`;

  // Call getUserDetails to fetch user details including check-in date
  this.authService.getUserDetails(this.email).subscribe(
    (response: any) => {
      const storedCheckinDate = new Date(response.checkindate);
      console.log('Fetched check-in date:', storedCheckinDate);
      if (!this.isSameDate(now, storedCheckinDate)) {
        // If the stored check-in date is different, update date
        this.updateCheckInDate(now);
        this.saveCheckInTime(checktm);

        // Update hasCheckedIn status
      } else {
       
        alert("You have already checked in today.");
      } this.checkinService.updateCheckinStatus(true);
      },
      (error) => {
        console.error('Error retrieving stored check-in date:', error);
      }
    );
  }
  
isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

saveCheckInTime(checktm: string) {
    // Send HTTP request to backend to save the check-in time
    this.http.post<any>('http://localhost:9992/savecheckintm', { email: this.email, checkintm: checktm }).subscribe(
        (response: any) => {
            console.log('Check-in time saved successfully:', response);
        },
        (error) => {
            console.error('Error saving check-in time:', error);
        }
    );
}

updateCheckInDate(checkindate : Date) {
    // Send HTTP request to backend to update the check-in date in the database
    this.http.post<any>('http://localhost:9992/savecheckindate', { email: this.email, checkindate: checkindate }).subscribe(
        (response: any) => {
            console.log('Check-in date updated successfully:', response);
        },
        (error) => {
            console.error('Error updating check-in date:', error);
        }
    );
}


}