import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Trello Application';
  constructor(private authservice:AuthService){

  }
  ngOnInit(): void {
      this.authservice.getCurrentUser().subscribe({
        next: (res) => {
          console.log(res);
        },
        error:(err) => {
          console.log('err',err)
          this.authservice.setCurrentUser(null);
        }
        
      })
  }
}
