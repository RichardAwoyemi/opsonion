import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-delete-page-modal',
  templateUrl: './builder-delete-page-modal.component.html',
})
export class BuilderDeletePageModalComponent implements IModalComponent {
  @Input() activePage;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService
  ) {}

  onCloseButtonClick(): void {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick(): void {
    this.activeModal.dismiss();
    this.builderService.activePageSetting.next('Home');
    this.builderService.activePageIndex.next(this.builderComponentsService.getPageIndex('Home'));
    this.builderComponentsService.deletePage(this.activePage);
    this.toastrService.success('Your page has been deleted.', 'Great!');
  }
}
