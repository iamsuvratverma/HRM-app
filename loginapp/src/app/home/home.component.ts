import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras } from '@angular/router';
import { CheckinService } from '../checkin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails: any;
  loginTime!: string;
  checkout: string = "";
  loginDate: Date | null = null;
  email: any;
  hasCheckedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private checkinService: CheckinService // Inject the CheckinService
  ) { }

  ngOnInit(): void {
    // Check if the user is authenticated before loading user details
    if (this.authService.isLoggedIn()) {
      this.loadUserDetails();
      this.retrieveLoginDate();
      this.checkinService.hasCheckedIn$.subscribe((status: boolean) => {
        this.hasCheckedIn = status;
      });
    } else {
      // Redirect to login page if not authenticated
      this.router.navigateByUrl('/login');
    }
  }

  loadUserDetails(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.authService.getUserDetails(email).subscribe(
        (data) => {
          this.userDetails = data;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('Email not provided in route');
    }
  }


  logout(): void {
    console.log("Logging out...");
    const now = new Date();
    const logoutTimeString = this.formatTime(now); // Format the time manually
    const logoutDateString = this.formatDate(now); // Format the date manually

    // **Server-Side Interaction (Required):**
    this.saveLogoutTime(logoutTimeString);
    this.saveLogoutDate(logoutDateString);

    // Clear navigation history (optional, server-side might be more effective)
    this.authService.clearSession();
    // Navigate to login page
    this.router.navigateByUrl('/login');
  }

  saveLogoutDate(logoutDateString: string): void {
    // Send HTTP request to backend to save the logout date
    this.http.post<any>('http://localhost:9992/saveLogoutdate', { email: this.userDetails.email, logoutdate: logoutDateString }).subscribe(
      (response: any) => {
        console.log('Logout date saved successfully:', response);
      },
      (error) => {
        console.error('Error saving logout date:', error);
      }
    );
  }

  saveLogoutTime(logoutTimeString: string): void {
    // Send HTTP request to backend to save the logout time
    this.http.post<any>('http://localhost:9992/saveLogoutTime', { email: this.userDetails.email, logoutTime: logoutTimeString }).subscribe(
      (response: any) => {
        console.log('Logout time saved successfully:', response);
      },
      (error) => {
        console.error('Error saving logout time:', error);
      }
    );
  }

  formatTime(date: Date): string {
    // Get the components of the time
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12

    // Construct the formatted time string
    return `${hours}:${minutes} ${ampm}`;
  }

  formatDate(date: Date): string {
    if (!date) {
      console.error('Invalid date provided to formatDate function');
      return ''; // Return an empty string or any default value
    }

    // Define month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get the components of the date
    const day = date.getDate().toString();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString();

    // Construct the formatted date string
    return `${day} ${month}, ${year}`;
  }

  retrieveLoginDate(): void {
    const loginDateStored = localStorage.getItem('loginDate');
    if (loginDateStored) {
      this.loginDate = new Date(loginDateStored);
    }
  }



  // checkout-------


  checkoutN() {
    const now = new Date();
    const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    const formattedTime = this.formatTimen(now);

    // Format the checkout date and time string
    const checkoutDateTime = `${formattedTime} & ${formattedDate}`;

    // Send checkout date and time to the backend
    this.saveCheckoutDateTime(checkoutDateTime);
    console.log(this.saveCheckoutDateTime);
  }
  saveCheckoutDateTime(checkoutDateTime: string) {
    // Send HTTP request to backend to save the checkout time
    this.http.post<any>('http://localhost:9992/savecheckout', { email: this.userDetails.email, checkout: checkoutDateTime }).subscribe(
      (response: any) => {
        console.log('Check-out time saved successfully:', response);
      },
      (error) => {
        console.error('Error saving check-out time:', error);
      }
    );
  }


  formatTimen(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const sec = date.getSeconds();
    const ampm = hours >= 12 ? 'pm' : 'am';
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12

    // Construct the formatted time string
    return `${hours}:${minutes}:${sec} ${ampm}`;
  }


}