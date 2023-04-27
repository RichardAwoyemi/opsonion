import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IModalComponent } from '../../../../shared/models/modal';
import { UtilService } from '../../../../shared/services/util.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderService } from '../../builder.service';
import { BuilderActionsService } from '../builder-actions.service';

@Component({
  selector: 'app-builder-rename-page-modal',
  templateUrl: './builder-rename-page-modal.component.html',
})
export class BuilderRenamePageModalComponent implements IModalComponent, OnInit {
  @Input() activePageIndex: number;
  @Input() activePage: string;
  pageName: string;
  displayError = false;
  disableSaveButton = false;
  pages: string[];
  activePageSetting: string;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService
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
    const pageName = this.pageName;

    this.builderComponentsService.renamePage(UtilService.toTitleCase(pageName), this.activePage);
    this.builderService.activeComponentMetadata.next(null);
    this.builderService.activePageSetting.next('Home');
    this.builderService.activePageIndex.next(this.builderComponentsService.getPageIndex('Home'));

    this.toastrService.success('Your page has been renamed.', 'Great!');
  }

  validatePageName(): void {
    if (this.pageName.toLowerCase().trim() !== this.activePage.toLowerCase().trim()) {
      this.displayError = BuilderActionsService.togglePageModalErrorMessage(
        this.pageName,
        this.builderComponentsService.website.getValue()
      );
    }
    this.disableSaveButton = BuilderActionsService.togglePageModalSaveButton(
      this.pageName,
      this.builderComponentsService.website.getValue()
    );
  }
}
