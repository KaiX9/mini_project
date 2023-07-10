import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticateErrorComponent } from './dialogs/authenticate-error.component';
import { GuidesService } from '../services/guides.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loginSvc = inject(LoginService);
  router = inject(Router);
  dialog = inject(MatDialog);
  guidesSvc = inject(GuidesService);
  imageSources: string[] = [];
  viewCounts: number[] = [];
  selectedGuides: any[] = [];

  images = [
    '/assets/images/image1.jpg', '/assets/images/image2.jpg',
    '/assets/images/image3.jpg', '/assets/images/image4.jpg',
    '/assets/images/image5.jpg', '/assets/images/image6.jpg',
    '/assets/images/image7.jpg', '/assets/images/image8.jpg',
    '/assets/images/image9.jpg', '/assets/images/image10.jpg',
    '/assets/images/image11.jpg', '/assets/images/image12.jpg',
    '/assets/images/image13.jpg', '/assets/images/image14.jpg',
    '/assets/images/image15.jpg'
  ];

  ngOnInit(): void {
    this.loginSvc.dashboard().subscribe(
      result => {
        console.info(JSON.stringify(result));
        if (result.name) {
          localStorage.setItem('name', result.name);
        }
      },
      error => {
        if (error) {
          this.router.navigate(['/']).then(() => {
            const errorMessage = error.error.error;
            this.dialog.open(AuthenticateErrorComponent, {
              data: { message: errorMessage }
            });
          });
        }
      }
    );

    this.guidesSvc.getAllGuides().subscribe(guides => {
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * guides.length);
        this.selectedGuides.push(guides[randomIndex]);
        guides.splice(randomIndex, 1);
      }
      this.imageSources = [];
      this.viewCounts = [];
      for (const guide of this.selectedGuides) {
        this.imageSources.push(this.getRandomValue(this.images, this.imageSources));
        this.viewCounts.push(Math.floor(Math.random() * (30000 - 100 + 1)) + 100);
      }
    });
  }

  getRandomValue(array: any[], exclude: any[] = []) {
    const filteredArray = array.filter(item => !exclude.includes(item));
    return filteredArray[Math.floor(Math.random() * filteredArray.length)];
  }

  onGuideClick(guide: any) {
    console.info('guide clicked: ', guide);
    const authorName = guide.author;
    this.guidesSvc.setAuthorName(authorName);
    this.guidesSvc.setSelectedGuide(guide);
    this.router.navigate(['/guide', guide.uuid]);
  }
}