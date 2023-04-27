import {
  Component,
  HostListener,
  Input, OnChanges, SimpleChanges
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';
import { debounce } from '../../../../shared/decorators/debounce.decorator';
import { HTMLInputEvent } from '../../../../shared/models/html-input-event';
import { IWebsite } from '../../../../shared/models/website';
import { AuthService } from '../../../auth/auth.service';
import { MAX_NUMBER_OF_PAGES } from '../../builder';
import { BuilderCreateAccountModalComponent } from '../../builder-actions/builder-create-account-modal/builder-create-account-modal.component';
import { BuilderDeletePageModalComponent } from '../../builder-actions/builder-delete-page-modal/builder-delete-page-modal.component';
import { BuilderNewPageModalComponent } from '../../builder-actions/builder-new-page-modal/builder-new-page-modal.component';
import { BuilderSaveWebsiteModalComponent } from '../../builder-actions/builder-save-website-modal/builder-save-website-modal.component';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-showcase-toolbar',
  templateUrl: './builder-showcase-toolbar.component.html',
  styleUrls: ['./builder-showcase-toolbar.component.css']
})
export class BuilderShowcaseToolbarComponent implements OnChanges {
  @Input() innerHeight: number;
  @Input() website: IWebsite;
  @Input() previewButtonIcon = 'btn-icon';
  @Input() fullScreenButtonIcon = 'btn-icon';
  @Input() activeOrientation: string;
  @Input() activePage = 'Home';
  @Input() activePageIndex: number;
  @Input() previewMode: boolean;
  @Input() fullScreenMode: boolean;
  @Input() menuOptions = Array<string>();

  dropdownClass = 'dropdown';
  dropdownMenuClass = 'dropdown-menu';
  ariaExpandedAttribute = 'false';

  constructor(
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
    private modalService: NgbModal,
    private simpleModalService: SimpleModalService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  static openFullScreen(): void {
    const element = document.documentElement;
    const methodToBeInvoked =
      element['requestFullscreen'] ||
      element['webkitRequestFullScreen'] ||
      element['mozRequestFullscreen'] ||
      element['msRequestFullscreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(element);
    }
  }

  static closeFullScreen(): void {
    const methodToBeInvoked =
      document['exitFullscreen'] ||
      document['webkitExitFullscreen'] ||
      document['mozCancelFullScreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(document);
    }
  }

  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  @HostListener('document:mozfullscreenchange')
  @HostListener('document:MSFullscreenChange')
  @debounce()
  onFullScreenChange(): void {
    const fullscreenElement =
      document.fullscreenElement ||
      document['mozFullScreenElement'] ||
      document['webkitFullscreenElement'];
    if (!fullscreenElement) {
      this.builderService.fullScreenMode.next(false);
    }
  }

  @HostListener('document:click', ['$event'])
  documentClick(e: HTMLInputEvent): void {
    if (e.target.id !== 'pages-dropdown') {
      if (this.dropdownClass === 'dropdown show') {
        this.dropdownClass = 'dropdown';
        this.dropdownMenuClass = 'dropdown-menu';
        this.ariaExpandedAttribute = 'false';
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        if (prop === 'website' && change.currentValue) {
          this.menuOptions = this.builderComponentsService.getPages(change.currentValue);
        }
      }
    }
  }

  openDeletePageModal(): void {
    if (this.activePage !== 'Home') {
      const modal = this.modalService.open(BuilderDeletePageModalComponent, {
        windowClass: 'modal-holder',
        centered: true,
      });
      modal.componentInstance.activePage = this.activePage;
    } else {
      this.simpleModalService.displayMessage(
        'Oops!',
        `You cannot delete the ${this.activePage} page.`
      );
    }
  }

  openNewPageModal(): void {
    const numberOfPages = this.menuOptions.length;
    if (numberOfPages + 1 > MAX_NUMBER_OF_PAGES) {
      this.toastrService.warning(
        `You cannot create more than ${MAX_NUMBER_OF_PAGES} pages on your current plan.`,
        'Oops!'
      );
    } else {
      const modal = this.modalService.open(BuilderNewPageModalComponent, {
        windowClass: 'modal-holder',
        centered: true,
      });
      modal.componentInstance.pages = this.menuOptions;
      modal.componentInstance.website = this.website;
    }
  }

  togglePreview(): void {
    this.builderService.clearActiveComponent();
    this.builderService.previewMode.next(!this.previewMode);
  }

  setDropdownClass(): void {
    this.dropdownClass = 'dropdown show';
    this.dropdownMenuClass = 'dropdown-menu show';
    this.ariaExpandedAttribute = 'true';
  }

  setActivePage(menuOption: string, i: number): void {
    this.dropdownClass = 'dropdown';
    this.dropdownMenuClass = 'dropdown-menu';
    this.ariaExpandedAttribute = 'false';
    this.builderService.activePageSetting.next(menuOption);
    this.builderService.activePageIndex.next(i);
  }

  toggleFullScreen(): void {
    this.builderService.fullScreenMode.next(!this.fullScreenMode);
    if (this.fullScreenMode) {
      BuilderShowcaseToolbarComponent.openFullScreen();
    } else {
      BuilderShowcaseToolbarComponent.closeFullScreen();
    }
  }

  openSaveWebsiteModal(): void {
    if (!this.authService.isLoggedIn()) {
      this.modalService.open(BuilderCreateAccountModalComponent, {
        windowClass: 'modal-holder',
        centered: true,
      });
    } else {
      this.modalService.open(BuilderSaveWebsiteModalComponent, {
        windowClass: 'modal-holder',
        centered: true,
      });
    }
  }
}
