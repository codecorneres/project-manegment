import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-slidbar',
  templateUrl: './slidbar.component.html',
  styleUrls: ['./slidbar.component.css']
})
export class SlidbarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
