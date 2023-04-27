import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from 'src/app/shared/services/template.service';
import { RouterService } from '../../shared/services/router.service';
import { UtilService } from '../../shared/services/util.service';
import { WebsiteService } from '../../shared/services/website.service';
import { AuthService } from '../auth/auth.service';
import { ActiveDragType, ActiveSettings, MIN_BUILDER_WINDOW_WIDTH } from './builder';
import { BuilderComponentsService } from './builder-components/builder-components.service';
import { BuilderService } from './builder.service';
import { FontsService } from '../../shared/services/fonts.service';
import { ExceptionService } from '../../shared/services/exception.service';
import * as fromUser from '../core/store/shared/user.reducer';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { ThemeService } from '../../shared/services/theme.service';
import { ITheme } from '../../shared/models/theme';
import {
  IDragData,
  IComponentMetadata,
  IToolbarColours,
} from './builder-components/builder-components';
import { BuilderActionsService } from './builder-actions/builder-actions.service';
import { BlacklistService } from '../../shared/services/blacklist.service';
import { IUnsplashResponse } from '../../shared/models/unsplash';
import { IPhotoCategory, PhotosService } from '../../shared/services/photos-service';
import { environment } from '../../../environments/environment';
import { UnsplashService } from '../../shared/services/unsplash.service';
import { IWebsite } from 'src/app/shared/models/website';
import { BuilderToolbarElementService } from './builder-toolbar/builder-toolbar-elements/builder-toolbar-element.service';
import { BuilderSidebarTextService } from './builder-sidebar/builder-sidebar-text/builder-sidebar-text.service';
import { ISidebarTextItem } from './builder-sidebar/builder-sidebar-text/builder-sidebar-text';
import { ElementLibraryService } from '../../shared/services/element-library.service';
import { IElement } from '../../shared/models/element';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.page.html',
  styleUrls: ['./builder.page.css'],
})
export class BuilderComponent implements OnInit, AfterViewInit, OnDestroy {
  innerWidth: number;
  innerHeight: number;
  previewMode = false;
  sidebarClass = 'col-md-3';
  websiteName: string;
  websiteLoaded = false;
  user: IUser;
  renameWebsiteModalStatus: boolean;
  themes: ITheme[];
  blacklistTerms: string[];
  MIN_BUILDER_WIDTH = MIN_BUILDER_WINDOW_WIDTH;
  activeSetting: ActiveSettings;
  activeDragData: IDragData = {};
  unsplashPhotos: IUnsplashResponse[];
  unsplashPhotosLoaded: boolean;
  photoCategories: IPhotoCategory[];
  photoCategoriesLoaded: boolean;
  website: IWebsite;
  previewButtonIcon: string;
  showcaseHeight: number;
  iframeHolderHeight: number;
  iframeHeight: number;
  activeComponentMetadata: IComponentMetadata;
  activePage: string;
  activePageIndex: number;
  activeOrientation: string;
  fontUrl: string;
  fullScreenButtonIcon: string;
  fullScreenMode: boolean;
  activeToolbarElement: string;
  activeFontName: string;
  textItems: ISidebarTextItem[];
  imageLibrary: IElement[];
  buttonLibrary: IElement[];

  ngUnsubscribe = new Subject<void>();
  activeToolbarColourSetting: {
    index: number;
    colour: string;
    setting: IToolbarColours;
  };
  sidebarStyle: { 'max-width': string; 'min-width': string };

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private builderService: BuilderService,
    private builderActionsService: BuilderActionsService,
    private routerService: RouterService,
    private websiteService: WebsiteService,
    private shepherdService: ShepherdService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private templateService: TemplateService,
    private fontsService: FontsService,
    private exceptionService: ExceptionService,
    private themeService: ThemeService,
    private unsplashService: UnsplashService,
    private photosService: PhotosService,
    private blacklistService: BlacklistService,
    private userStore: Store<fromUser.State>,
    private router: Router,
    private builderComponentsService: BuilderComponentsService,
    private builderSidebarTextService: BuilderSidebarTextService,
    private elementLibraryService: ElementLibraryService,
    private builderToolbarElementService: BuilderToolbarElementService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    if (innerWidth >= MIN_BUILDER_WINDOW_WIDTH) {
      this.fontsService.setActiveFonts();
    }
  }

  async ngOnInit(): Promise<void> {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.routerService.currentRoute.next(window.location.pathname);
    this.routerService.setCurrentRoute();
    this.websiteService.websiteName.next(UtilService.generateWebsiteName());
    this.builderService.activeComponentMetadata.next(null);
    this.builderService.activeSetting.next(ActiveSettings.Templates);

    this.ngxLoader.start();
    this.builderService.websiteMode.next(false);
    this.builderService.previewMode.next(false);
    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.previewMode = response;
        this.previewButtonIcon = 'btn-icon-active';
        this.showcaseHeight = 74;
        this.iframeHolderHeight = 132;
        this.iframeHeight = 128;
      } else {
        this.previewMode = false;
        this.previewButtonIcon = 'btn-icon';
        this.showcaseHeight = 122;
        this.iframeHolderHeight = 184;
        this.iframeHeight = 180;
      }
    });

    const id = window.location.pathname.split('/')[2];
    if (id) {
      this.websiteService.websiteId.next(id);
      this.userStore
        .select('user')
        .pipe()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(async (user: IUser) => {
          if (user) {
            this.user = user;
            this.websiteService
              .getWebsiteById(id)
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(
                (website) => {
                  if (website && website.pages) {
                    if (!this.authService.isOwnedByUser(user, website)) {
                      this.routerService.currentRoute.next('dashboard');
                      this.routerService.setCurrentRoute();
                      this.routerService.router
                        .navigate([RouterService.getCurrentRoute()])
                        .then(() => {});
                    } else {
                      this.websiteService.websiteName.next(website.name);
                      this.builderComponentsService.website.next({
                        pages: website.pages,
                        template: website.template,
                        uploads: website.uploads,
                      });
                      this.fontsService.setActiveFonts();
                      this.activePageIndex = this.builderComponentsService.getPageIndex(
                        this.activePage
                      );
                    }
                  } else {
                    this.templateService.getWebsite('default').then((getWebsiteResponse) => {
                      this.builderComponentsService.website.next(getWebsiteResponse);
                      this.fontsService.setActiveFonts();
                      this.activePageIndex = this.builderComponentsService.getPageIndex(
                        this.activePage
                      );
                    });
                    if (!this.authService.isLoggedIn()) {
                      if (this.innerWidth >= this.MIN_BUILDER_WIDTH) {
                        this.toastrService.warning(
                          'All changes will not be saved until you create an account.'
                        );
                        localStorage.setItem('builderTourComplete', 'false');
                      }
                    }
                  }
                  this.websiteService.websiteLoaded.next(true);
                },
                (error) => {
                  if (this.exceptionService.isInsufficientPermissionError(error)) {
                    this.routerService.currentRoute.next('dashboard');
                    this.routerService.setCurrentRoute();
                  }
                }
              );
          }
        });

      this.themeService.themeList.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
        if (response) {
          this.themes = response;
        }
      });

      this.builderService.activeSetting
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          this.activeSetting = response;
          if (this.activeSetting) {
            this.sidebarStyle = { 'max-width': '25%', 'min-width': 'auto' };
          } else {
            this.sidebarStyle = { 'max-width': '3%', 'min-width': 'min-content' };
          }
        });

      this.builderService.activeDragData
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          this.activeDragData = response;
        });

      this.builderActionsService.renameRenameWebsiteModalStatus
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          if (response) {
            this.renameWebsiteModalStatus = response['open'];
          }
        });

      this.websiteService.websiteName.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
        if (response) {
          this.websiteName = response;
        }
      });

      this.blacklistService
        .getAllBlackListTerms()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((blacklistTerms) => {
          if (blacklistTerms) {
            this.blacklistTerms = blacklistTerms.flatMap((x) => x.blacklist);
          }
        });

      this.photosService
        .getAllPhotoCategoryTitles()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((photoCategoryTitles) => {
          if (photoCategoryTitles) {
            const photoCategoriesImages = PhotosService.preloadPhotos(photoCategoryTitles);
            const photoCategories = [];
            for (let i = 0; i < photoCategoryTitles.length; i++) {
              const photoCategory: IPhotoCategory = {
                title: (photoCategoryTitles[i] as unknown) as string,
                image: photoCategoriesImages[i] as HTMLImageElement,
              };
              if (photoCategory.title && photoCategory.image) {
                photoCategories.push(photoCategory);
              }
            }
            this.photoCategories = photoCategories;
            this.photoCategoriesLoaded = true;
          }
        });

      if (!environment.production) {
        this.unsplashService
          .getDummyPhotos()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((unsplashPhotos) => {
            if (unsplashPhotos) {
              this.unsplashPhotos = unsplashPhotos;
              this.unsplashPhotosLoaded = true;
            }
          });
      } else {
        UnsplashService.getPhotos().then(
          (unsplashPhotos) => (this.unsplashPhotos = unsplashPhotos)
        );
      }

      this.fontsService.fontUrl.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
        if (response) {
          this.fontUrl = UtilService.shallowClone(response);
        }
      });

      this.builderService.activeOrientation
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          if (response) {
            this.activeOrientation = response;
          }
        });

      this.builderService.activePageSetting
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          if (response) {
            this.activePage = response;
            this.activePageIndex = this.builderComponentsService.getPageIndex(this.activePage);
          }
        });

      this.builderService.activePageIndex
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          this.activePageIndex = response;
        });

      this.builderService.fullScreenMode
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          this.fullScreenMode = response;
          if (this.fullScreenMode) {
            this.fullScreenButtonIcon = 'btn-icon-active';
          } else {
            this.fullScreenButtonIcon = 'btn-icon';
          }
        });

      this.websiteService.websiteLoaded
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          if (response) {
            this.websiteLoaded = response;
          }
        });

      this.builderService.activeComponentMetadata
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          this.activeComponentMetadata = response;
        });

      this.builderComponentsService.website
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          this.website = response;
        });

      this.builderToolbarElementService.activeToolbarElement
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          this.activeToolbarElement = response;
        });

      this.builderToolbarElementService.activeToolbarColourSetting
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          this.activeToolbarColourSetting = response;
        });

      this.builderToolbarElementService.activeFontName
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          if (response) {
            this.activeFontName = response;
          }
        });

      this.elementLibraryService
        .getImageElementLibrary()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          if (response) {
            this.imageLibrary = Object.keys(response)
              .map((i) => response[i])
              .map((j) => ({ ...j, type: ActiveDragType.Image }));
          }
        });

      this.elementLibraryService
        .getButtonElementLibrary()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          if (response) {
            this.buttonLibrary = Object.keys(response)
              .map((i) => response[i])
              .map((j) => ({ ...j, type: ActiveDragType.Button }));
          }
        });

      this.textItems = [];
      this.ngxLoader.stop();
    }
  }

  ngAfterViewInit(): void {
    this.fontsService.setActiveFonts();
    if (this.innerWidth >= MIN_BUILDER_WINDOW_WIDTH && environment.production) {
      const startTour = localStorage.getItem('builderTourComplete');
      if (!startTour || startTour === 'false') {
        this.shepherdService.defaultStepOptions = this.builderService.shepherdDefaultStepOptions;
        this.shepherdService.requiredElements = [];
        this.shepherdService.modal = true;
        this.shepherdService.confirmCancel = false;
        this.shepherdService.addSteps(this.builderService.shepherdDefaultSteps);
        this.shepherdService.start();
        localStorage.setItem('builderTourComplete', 'true');
      }
    }
  }

  redirect(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']).then(() => {});
    } else {
      this.router.navigate(['home']).then(() => {});
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
