import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  projects: Project[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.http.get<Project[]>('http://localhost:5015/api/projects').subscribe(data => {
      this.projects = data;
    }, error => {
      console.error('Error fetching projects', error);
    });
  }
}
