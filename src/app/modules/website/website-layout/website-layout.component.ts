import { AfterViewInit, Component, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { RouterService } from '../../../shared/services/router.service';
import { WebsiteService } from '../../../shared/services/website.service';
import { BuilderComponentsService } from '../../builder/builder-components/builder-components.service';
import { BuilderService } from '../../builder/builder.service';
import { FontsService } from '../../../shared/services/fonts.service';
import { IWebsite } from '../../../shared/models/website';

@Component({
  selector: 'app-website-layout',
  templateUrl: './website-layout.component.html',
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls: ['./website-layout.component.css'],
})
export class WebsiteLayoutComponent implements AfterViewInit, OnDestroy {
  activePage = 'Home';
  website: IWebsite;
  pageComponents: string[];
  id: string;
  document: Document;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService,
    private websiteService: WebsiteService,
    private element: ElementRef,
    private builderComponentsService: BuilderComponentsService,
    private fontsService: FontsService,
    private ngxLoader: NgxUiLoaderService,
    private toastrSevice: ToastrService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    if (RouterService.checkIfIsOnDomain()) {
      this.setupInternalWebsite();
    } else {
      this.setupExternalWebsite();
    }
  }

  static addFontsToLightRoot(src: string): void {
    const linkNode = document.createElement('link');
    linkNode.type = 'text/css';
    linkNode.rel = 'stylesheet';
    linkNode.href = src;
    document.head.appendChild(linkNode);
  }

  private static addCssToShadowRoot(shadowRoot: Document, src: string) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', src);
    link.setAttribute('type', 'text/css');
    shadowRoot.prepend(link);
  }

  setupInternalWebsite(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.websiteService.websiteId.next(this.id);
        this.setupWebsite();
      }
    });
  }

  setupExternalWebsite(): void {
    const full = window.location.host;
    const parts = full.split('.');
    if (parts[0] && parts[1] && parts[2]) {
      const websiteName = parts[0];
      this.websiteService
        .getWebsiteByName(websiteName)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          if (response[0]) {
            this.id = response[0]['id'];
            this.websiteService.websiteId.next(response[0]['id']);
            this.setupWebsite();
          } else {
            window.location.href = environment.domainUrl;
          }
        });
    }
  }

  setupWebsite(): void {
    this.ngxLoader.start();
    this.builderService.activePageSetting
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((activePageResponse) => {
        if (activePageResponse) {
          this.activePage = activePageResponse;
          this.websiteService
            .getWebsiteById(this.id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((websiteResponse) => {
              if (websiteResponse) {
                this.websiteService.websiteName.next(websiteResponse.name);
                if (websiteResponse.pages) {
                  this.builderComponentsService.website.next({
                    pages: websiteResponse.pages,
                    template: websiteResponse.template,
                    uploads: websiteResponse.uploads,
                  });
                  this.builderComponentsService.website
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((pageComponentsResponse) => {
                      if (pageComponentsResponse) {
                        this.website = pageComponentsResponse;
                        this.setPageComponents();
                        if (pageComponentsResponse) {
                          this.fontsService.getActiveFonts(this.website).forEach((fontUrl) => {
                            WebsiteLayoutComponent.addFontsToLightRoot(fontUrl);
                          });
                        }
                      }
                    });
                }
              } else {
                this.toastrSevice.warning('This website cannot be found.', 'Oops!');
                this.router.navigate(['home']).then(() => {});
              }
            });
        } else {
        }
        this.ngxLoader.stop();
      });
  }

  ngAfterViewInit(): void {
    const shadowRoot = this.element.nativeElement.shadowRoot;
    WebsiteLayoutComponent.addCssToShadowRoot(shadowRoot, 'assets/css/fonts.css');
    WebsiteLayoutComponent.addCssToShadowRoot(shadowRoot, 'assets/css/website.css');
    WebsiteLayoutComponent.addCssToShadowRoot(shadowRoot, 'assets/css/page.min.css');
  }

  setPageComponents(): void {
    let tempBuilderComponents = null;
    this.pageComponents = [];
    this.builderComponentsService.activeComponentIndex.next(null);

    for (let i = 0; i < this.website.pages.length; i++) {
      if (this.website.pages[i].name === this.activePage) {
        tempBuilderComponents = this.website.pages[i].components;
      }
    }

    if (tempBuilderComponents) {
      for (let j = 0; j < tempBuilderComponents.length; j++) {
        this.pageComponents.push(
          `<${tempBuilderComponents[j].componentName} id='${tempBuilderComponents[j].componentId}'/><${tempBuilderComponents[j].componentName}>`
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
