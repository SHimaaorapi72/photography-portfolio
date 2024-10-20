import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: '',
  };

  constructor(private http: HttpClient) {}

  submitContactForm() {
    this.http.post('http://localhost:5015/api/contact', this.contact).subscribe(
      (response) => {
        alert('Message sent successfully!');
        this.contact = { name: '', email: '', message: '' };
      },
      (error) => {
        alert('Something went wrong. Please try again.');
        console.error(error);
      }
    );
  }
}
