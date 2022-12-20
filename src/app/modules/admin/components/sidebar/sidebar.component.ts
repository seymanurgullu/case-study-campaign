import { AuthService } from './../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
  logout(): void {
    this.auth.logout();
  }
}
