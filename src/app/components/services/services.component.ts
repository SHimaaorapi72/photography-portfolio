import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Service {
  title: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices() {
    this.http.get<Service[]>('http://localhost:5015/api/services')
      .subscribe(data => {
        this.services = data;
      }, error => {
        console.error('Error fetching services', error);
      });
  }
}
