import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { UtilService } from '../../../../shared/services/util.service';
import { IUnsplashResponse } from '../../../../shared/models/unsplash';
import { ActiveSettings } from '../../builder';
import { UnsplashService } from '../../../../shared/services/unsplash.service';
import { IPhotoCategory } from '../../../../shared/services/photos-service';
import { trigger } from '@angular/animations';
import { fadeIn } from '../../../../shared/models/animations';
import { IComponentMetadata } from '../../builder-components/builder-components';
import { ISidebarSearchInputMessage } from '../builder-sidebar-search-input/builder-sidebar-search-input';

@Component({
  selector: 'app-builder-sidebar-photos',
  templateUrl: './builder-sidebar-photos.component.html',
  styleUrls: ['./builder-sidebar-photos.component.css'],
  animations: [trigger('fadeIn', fadeIn())],
})
export class BuilderSidebarPhotosComponent implements OnChanges, AfterViewInit {
  @Input() photos: IUnsplashResponse[];
  @Input() initialPhotos: IUnsplashResponse[];
  @Input() photosLoaded = false;
  @Input() photoCategories: IPhotoCategory[];
  @Input() photoCategoriesLoaded = false;
  @Input() activeSetting = null;
  @Input() innerHeight;
  @Input() activeComponentMetadata: IComponentMetadata;
  @Input() tabClass;

  CAROUSEL_ITEM_BUTTON_RIGHT_POSITION_OFFSET = 53;
  PHOTOS_LISTING_INNER_HEIGHT_OFFSET = 176;
  CAROUSEL_ITEM_BUTTON_HEIGHT = 40;
  TAB_NAME = ActiveSettings.Photos;

  sidebarInnerWidth: number;
  pageIndex = 1;
  searchText: string;
  photosListingInnerHeight: number;
  carouselItemButtonLeftPosition = 0;
  carouselItemButtonRightPosition: number;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setCarouselButtonPosition();
  }

  ngAfterViewInit(): void {
    this.setCarouselButtonPosition();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        switch (prop) {
          case 'innerHeight': {
            this.photosListingInnerHeight =
              change.currentValue -
              this.PHOTOS_LISTING_INNER_HEIGHT_OFFSET -
              this.CAROUSEL_ITEM_BUTTON_HEIGHT;
            break;
          }
          case 'photoCategoriesLoaded': {
            if (change.currentValue === true) {
              this.setInitialLoader();
            }
            break;
          }
          case 'photosLoaded': {
            if (change.currentValue === true) {
              this.setInitialLoader();
            }
            break;
          }
          case 'activeSetting': {
            if (change.currentValue === ActiveSettings.Photos) {
              this.setInitialLoader();
            }
            break;
          }
        }
      }
    }
  }

  setCarouselButtonPosition(): void {
    this.sidebarInnerWidth = document.getElementsByClassName('sidebar-menu-tab-content')[0][
      'offsetWidth'
    ];
    this.carouselItemButtonRightPosition =
      this.sidebarInnerWidth - this.CAROUSEL_ITEM_BUTTON_RIGHT_POSITION_OFFSET;
  }

  setInitialLoader(): void {
    if (
      this.photoCategoriesLoaded === true &&
      this.photosLoaded === true &&
      this.activeSetting === ActiveSettings.Photos
    ) {
      this.photoCategoriesLoaded = false;
      this.photosLoaded = false;
      setTimeout(() => {
        this.photoCategoriesLoaded = true;
        this.photosLoaded = true;
      }, 1000);
    }
  }

  setPhotosLoader(): void {
    this.photosLoaded = false;
    setTimeout(() => {
      this.photosLoaded = true;
    }, 1000);
  }

  trim(): void {
    if (!UtilService.isNullOrWhitespace(this.searchText)) {
      this.searchText.trim();
    }
  }

  setInputtedSearchText(searchInputMessage: string): void {
    if (!UtilService.isNullOrWhitespace(searchInputMessage)) {
      this.searchText = searchInputMessage.toLowerCase();
      this.searchImages();
    } else {
      this.setPhotosLoader();
      this.photos = this.initialPhotos;
    }
  }

  setEmittedSearchText(searchInputMessage: ISidebarSearchInputMessage): void {
    if (searchInputMessage.recipient === ActiveSettings.Photos) {
      if (!UtilService.isNullOrWhitespace(searchInputMessage.message)) {
        this.searchText = (<ISidebarSearchInputMessage>searchInputMessage).message.toLowerCase();
      } else {
        this.setPhotosLoader();
        this.photos = this.initialPhotos;
      }
    }
  }

  searchImages(): void {
    this.setPhotosLoader();
    this.pageIndex = 1;
    UnsplashService.searchImages(this.searchText, this.pageIndex).then((unsplashPhotos) => {
      if (unsplashPhotos) {
        this.photos = unsplashPhotos;
      }
    });
  }

  onScrollDown(): void {
    this.pageIndex += 1;
    if (UtilService.isNullOrWhitespace(this.searchText)) {
      UnsplashService.getPhotos().then((unsplashPhotos) => this.photos.push(...unsplashPhotos));
    } else {
      UnsplashService.searchImages(this.searchText, this.pageIndex).then((unsplashPhotos) => {
        this.photos.push(...unsplashPhotos);
      });
    }
  }
}
