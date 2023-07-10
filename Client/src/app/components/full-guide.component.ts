import { Component, OnInit, inject } from '@angular/core';
import { GuidesService } from '../services/guides.service';
import { DayData } from '../models/guides.models';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-full-guide',
  templateUrl: './full-guide.component.html',
  styleUrls: ['./full-guide.component.css']
})
export class FullGuideComponent implements OnInit {
  guide: any;
  guidesSvc = inject(GuidesService);
  authorName!: string; // Retrieved from selected guide
  author!: string | null; // Authenticated user
  likeCount!: number;
  router = inject(Router);
  _location = inject(Location);

  ngOnInit(): void {
    this.guide = this.guidesSvc.getSelectedGuide();
    console.info('guide: ', this.guide);
    this.author = localStorage.getItem('name');
    console.info('author: ', this.author);
    this.authorName = this.guidesSvc.getAuthorName();
    console.info('author name: ', this.authorName);
    this.likeCount = Math.floor(Math.random() * (350 - 20 + 1)) + 20;
  }

  getDayData(day: any): DayData {
    return day.value as DayData;
  }

  onEditClick() {
    console.info('guide', this.guide);
    this.router.navigate(['/guide/edit'], { state: { guide: this.guide } });
  }

  onBackClick() {
    this._location.back();
  }
}
