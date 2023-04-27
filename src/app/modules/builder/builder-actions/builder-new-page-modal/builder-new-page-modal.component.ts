import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { IModalComponent } from '../../../../shared/models/modal';
import { TemplateService } from '../../../../shared/services/template.service';
import { UtilService } from '../../../../shared/services/util.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderActionsService } from '../builder-actions.service';
import { IWebsite } from '../../../../shared/models/website';

@Component({
  selector: 'app-builder-new-page-modal',
  templateUrl: './builder-new-page-modal.component.html',
})
export class BuilderNewPageModalComponent implements IModalComponent, OnInit, OnDestroy {
  @Input() website: IWebsite;
  pageName: string;
  displayError = false;
  disableSaveButton = false;

  ngUnsubscribe = new Subject<void>();

  constructor(
    private templateService: TemplateService,
    private builderComponentsService: BuilderComponentsService,
    private toastrService: ToastrService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.displayError = false;
    this.disableSaveButton = true;
  }

  onCloseButtonClick(): void {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick(): void {
    this.activeModal.dismiss();
    const website = UtilService.shallowClone(this.builderComponentsService.website.getValue());
    if (!this.builderComponentsService.checkIfPageExists(this.pageName, website)) {
      const newPage = this.templateService.generateWebsitePagePlaceholders({
        pages: [{ name: UtilService.titleCase(this.pageName), components: [] }],
      });
      website.pages.push(newPage.pages[0]);
      this.builderComponentsService.website.next(website);
      this.toastrService.success('Your new page has been created.', 'Great!');
    } else {
      this.toastrService.warning('A page with this name already exists.', 'Oops!');
    }
  }

  validatePageName(): void {
    if (this.pageName && this.builderComponentsService.website.getValue()) {
      this.displayError = BuilderActionsService.togglePageModalErrorMessage(
        this.pageName,
        this.builderComponentsService.website.getValue()
      );
      this.disableSaveButton = BuilderActionsService.togglePageModalSaveButton(
        this.pageName,
        this.builderComponentsService.website.getValue()
      );
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
