import {
  AfterViewInit,
  Component,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import {
  DynamicTabsComponent,
  Tab,
} from '../_shared/dynamic-tabs/dynamic-tabs.component';
import { Router } from '@angular/router';
import { BusComponent } from '../bus/bus.component';

@Component({
  selector: 'app-main-page',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    CdkMenu,
    CdkMenuTrigger,
    DynamicTabsComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  isSideNavSideMode = false;
  isSideNavOpened = false;
  tabs: Tab<any>[] = [];
  bus = BusComponent;
  @ViewChild('tabContainer') tabContainer!: DynamicTabsComponent<any>;
  constructor(private router: Router) {}

  ngOnInit() {
    this.isSideNavSideMode =
      localStorage.getItem('is_sidenav_side_mode') == 'side';
    this.isSideNavOpened = localStorage.getItem('is_sidenav_opened') == 'true';
    this.onAddTab('Commuter bus route', this.bus);
  }
  onDrawerModeChange() {
    this.isSideNavSideMode = !this.isSideNavSideMode;
    localStorage.setItem(
      'is_sidenav_side_mode',
      this.isSideNavSideMode ? 'side' : 'over'
    );
  }
  onDrawerOpenChange(open: boolean) {
    this.isSideNavOpened = open;
    localStorage.setItem('is_sidenav_opened', open.toString());
  }
  onAddTab(title: string, content: Type<any>) {
    const newId = 'tab_' + Math.random().toString(36).substring(2, 7);
    const existing = this.tabs.find((t) => t.title === title);
    this.tabs.forEach((t) => (t.active = false));

    if (existing) {
      existing.active = true;
      this.tabContainer.scrollToTab(existing.id);
    } else {
      this.tabs.push({
        id: newId,
        title,
        content,
        active: true,
      });
      this.tabContainer?.scrollToTab(newId);
    }

    const navlinks = document.querySelectorAll('mat-nav-list>a');
    navlinks.forEach((link) => {
      const isActive = link.getAttribute('data-tab-name') === title;
      link.classList.toggle('active', isActive);
    });

    if (!this.isSideNavSideMode && this.isSideNavOpened) {
      this.isSideNavOpened = false;
    }
  }
}
