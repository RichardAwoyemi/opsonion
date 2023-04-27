import { Component, HostListener, OnInit } from '@angular/core';
import { debounce } from '../../../shared/decorators/debounce.decorator';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent implements OnInit {
  innerHeight: number;

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize(): void {
    this.innerHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight;
  }
}
