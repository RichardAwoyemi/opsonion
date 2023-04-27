import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ActiveSettings } from '../builder';
import {
  IDragData,
  IComponentMetadata,
  IToolbarColours,
} from '../builder-components/builder-components';
import { IUnsplashResponse } from '../../../shared/models/unsplash';
import { IPhotoCategory } from '../../../shared/services/photos-service';
import { IWebsite } from 'src/app/shared/models/website';
import { ISidebarTextItem } from './builder-sidebar-text/builder-sidebar-text';
import { IElement } from '../../../shared/models/element';

@Component({
  selector: 'app-builder-sidebar',
  templateUrl: './builder-sidebar.component.html',
  styleUrls: ['./builder-sidebar.component.css'],
})
export class BuilderSidebarComponent implements OnChanges {
  @Input() innerHeight: number;
  @Input() activeSetting: ActiveSettings;
  @Input() activePageIndex: number;
  @Input() activeDragData: IDragData;
  @Input() unsplashPhotos: IUnsplashResponse[];
  @Input() unsplashPhotosLoaded: boolean;
  @Input() photoCategories: IPhotoCategory[];
  @Input() photoCategoriesLoaded: boolean;
  @Input() activeComponentMetadata: IComponentMetadata;
  @Input() website: IWebsite;
  @Input() activeFontName: string;
  @Input() textItems: ISidebarTextItem[];
  @Input() imageLibrary: IElement[];
  @Input() buttonLibrary: IElement[];
  @Input() activeToolbarElement: string;
  @Input() activeToolbarColourSetting: {
    index: number;
    colour: string;
    setting: IToolbarColours;
  };

  activeTab = 'tab-pane fade active show tab-padding';
  activeToolbarTab = 'tab-pane fade active show';
  inactiveTab = 'tab-pane fade tab-padding';
  tabContainerClass: string;
  templatesTab: string;
  pagesTab: string;
  uploadsTab: string;
  fontsTab: string;
  colourTab: string;
  adjustTab: string;
  animateTab: string;
  photosTab: string;
  textTab: string;
  elementsTab: string;
  photos: IUnsplashResponse[];
  isToolbarTab: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        if (prop === 'unsplashPhotos') {
          this.photos = change.currentValue;
        }
        if (prop === 'activeSetting') {
          this.setTabs(change.currentValue);
        }
      }
    }
  }

  setTabs(activeSetting: ActiveSettings): void {
    this.tabContainerClass = this.setTabContainerClass(
      [ActiveSettings.Adjust, ActiveSettings.Animate, ActiveSettings.Colour, ActiveSettings.Font],
      activeSetting
    );
    this.colourTab = this.setToolbarTabClass([ActiveSettings.Colour], activeSetting);
    this.fontsTab = this.setToolbarTabClass([ActiveSettings.Font], activeSetting);
    this.adjustTab = this.setToolbarTabClass([ActiveSettings.Adjust], activeSetting);
    this.animateTab = this.setToolbarTabClass([ActiveSettings.Animate], activeSetting);
    this.templatesTab = this.setTabClass([ActiveSettings.Templates], activeSetting);
    this.pagesTab = this.setTabClass([ActiveSettings.Pages], activeSetting);
    this.photosTab = this.setTabClass([ActiveSettings.Photos], activeSetting);
    this.uploadsTab = this.setTabClass([ActiveSettings.Uploads], activeSetting);
    this.textTab = this.setTabClass([ActiveSettings.Text], activeSetting);
    this.elementsTab = this.setTabClass([ActiveSettings.Elements], activeSetting);
  }

  setTabContainerClass(toolbarTabs: ActiveSettings[], activeSetting: ActiveSettings): string {
    if (toolbarTabs.includes(activeSetting) && activeSetting) {
      this.isToolbarTab = true;
      return 'toolbar-sidebar-menu-tab-content toolbar-tab-content tab-content';
    } else {
      this.isToolbarTab = false;
      return 'sidebar-menu-tab-content sidebar-scroll tab-content';
    }
  }

  setTabClass(tab: ActiveSettings[], activeSetting: ActiveSettings): string {
    return tab.includes(activeSetting) ? this.activeTab : this.inactiveTab;
  }

  setToolbarTabClass(tab: ActiveSettings[], activeSetting: ActiveSettings): string {
    return tab.includes(activeSetting) ? this.activeToolbarTab : this.inactiveTab;
  }
}
