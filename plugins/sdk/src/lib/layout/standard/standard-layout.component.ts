import { Component, inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppSidebarComponent, AppToolbarComponent } from '../../components';
import { NavigationService } from '../../navigation';

export type StandardLayoutSettings = {
  showToolbar?: boolean;
  showSidebar?: boolean;
};

@Component({
  selector: 'app-standard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AppToolbarComponent, AppSidebarComponent],
  templateUrl: 'standard-layout.component.html',
  styleUrls: ['standard-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StandardLayoutComponent implements OnInit {
  private navigationService = inject(NavigationService);
  private activatedRoute = inject(ActivatedRoute);

  @Input()
  showToolbar = true;

  @Input()
  showSidebar = true;

  @ViewChild('sidebar')
  sidebar?: AppSidebarComponent;

  sidebarEntries$ = this.navigationService.sidebarEntries$;
  headerEntries$ = this.navigationService.headerEntries$;
  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      const settings = data['layout'] as StandardLayoutSettings;
      if (settings) {
        this.applySettings(settings);
      }
    });
  }

  private applySettings(settings: StandardLayoutSettings) {
    if (settings.showSidebar !== undefined) {
      this.showSidebar = settings.showSidebar;
    }

    if (settings.showToolbar !== undefined) {
      this.showToolbar = settings.showToolbar;
    }
  }
}
