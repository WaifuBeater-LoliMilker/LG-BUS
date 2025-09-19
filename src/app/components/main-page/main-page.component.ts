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
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AreasComponent } from '../areas/areas.component';
import { LocationsComponent } from '../locations/locations.component';
import { RouteTypesComponent } from '../route-types/route-types.component';
import { RequestFormEventComponent } from '../request-form-event/request-form-event.component';
import { RequestFormRouteComponent } from '../request-form-route/request-form-route.component';
import { RequestFormStopComponent } from '../request-form-stop/request-form-stop.component';
@Component({
  selector: 'app-main-page',
  imports: [
    FontAwesomeModule,
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
  faChevup = faChevronUp;
  faChevdown = faChevronDown;
  isSideNavSideMode = false;
  isSideNavOpened = false;
  categoriesOpen = true;
  applicationFormOpen = true;
  bus = BusComponent;
  area = AreasComponent;
  location = LocationsComponent;
  routeType = RouteTypesComponent;
  requestFormEvent = RequestFormEventComponent;
  requestFormRoute = RequestFormRouteComponent;
  requestFormStop = RequestFormStopComponent;
  @ViewChild('tabContainer') tabContainer!: DynamicTabsComponent<any>;
  constructor(private router: Router) {}

  ngOnInit() {
    this.isSideNavSideMode =
      localStorage.getItem('is_sidenav_side_mode') == 'side';
    this.isSideNavOpened = localStorage.getItem('is_sidenav_opened') == 'true';
    setTimeout(() => {
      this.onAddTab('Update commuter bus route', this.bus);
    });
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
    const existing = this.tabContainer.tabs.find((t) => t.title === title);
    this.tabContainer.tabs.forEach((t) => (t.active = false));

    if (existing) {
      existing.active = true;
      this.tabContainer.scrollToTab(existing.id);
    } else {
      this.tabContainer.tabs.push({
        id: newId,
        title,
        content,
        active: true,
      });
      this.tabContainer.scrollToTab(newId);
    }

    const navlinks = document.querySelectorAll('[data-tab-name]');
    navlinks.forEach((link) => {
      const isActive = link.getAttribute('data-tab-name') === title;
      link.classList.toggle('active', isActive);
    });

    if (!this.isSideNavSideMode && this.isSideNavOpened) {
      this.isSideNavOpened = false;
    }
  }
}
