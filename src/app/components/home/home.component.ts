import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Project {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.http.get<Project[]>('http://localhost:5015/api/projects').subscribe(data => {
      this.projects = data;
    });
  }
}
