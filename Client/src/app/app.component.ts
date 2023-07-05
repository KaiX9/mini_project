import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{  
  router = inject(Router);

  clickHome() {
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }
}