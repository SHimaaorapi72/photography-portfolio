import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  booking = {
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  submitBooking() {
    this.http.post('http://localhost:5015/api/bookings', this.booking).subscribe(
      (response) => {
        alert('Booking submitted successfully!');
        this.booking = { name: '', email: '', phone: '', date: '', message: '' };
      },
      (error) => {
        alert('Failed to submit booking. Please try again.');
        console.error(error);
      }
    );
  }
}
