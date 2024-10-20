import { Component, AfterViewInit } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'healthy-life';

  ngOnInit() {
    AOS.init();
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit() {
    gsap.from('.card', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.card',
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: true,
      },
    });
  }
  
}
