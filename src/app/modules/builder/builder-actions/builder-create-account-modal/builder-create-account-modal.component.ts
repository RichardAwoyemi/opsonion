import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { AuthService } from '../../../auth/auth.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderRegisterAccountModalComponent } from '../builder-register-account-modal/builder-register-account-modal.component';

@Component({
  selector: 'app-builder-create-account-modal',
  templateUrl: './builder-create-account-modal.component.html',
})
export class BuilderCreateAccountModalComponent implements IModalComponent {
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService,
    private builderComponentsService: BuilderComponentsService
  ) {}

  onConfirmButtonClick(): void {
    this.activeModal.dismiss();
  }

  onCloseButtonClick(): void {
    this.activeModal.dismiss();
  }

  googleSignIn(): void {
    this.authService
      .googleSignInWithBuilder(this.builderComponentsService.website.getValue())
      .then(() => {});
    this.activeModal.dismiss();
  }

  facebookSignIn(): void {
    this.authService
      .facebookSignInWithBuilder(this.builderComponentsService.website.getValue())
      .then(() => {});
    this.activeModal.dismiss();
  }

  emailSignIn(): void {
    this.activeModal.dismiss();
    this.modalService.open(BuilderRegisterAccountModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
    });
  }
}
