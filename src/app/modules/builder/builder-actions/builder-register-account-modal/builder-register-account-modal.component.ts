import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { AuthService } from '../../../auth/auth.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';

@Component({
  selector: 'app-builder-register-account-modal',
  templateUrl: './builder-register-account-modal.component.html',
})
export class BuilderRegisterAccountModalComponent implements IModalComponent {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  disableSaveButton = true;
  showFirstNameInputError = false;
  showLastNameInputError = false;
  showEmailInputError = false;
  showPasswordInputError = false;

  constructor(
    private activeModal: NgbActiveModal,
    private authService: AuthService,
    private builderComponentsService: BuilderComponentsService
  ) {}

  onCloseButtonClick(): void {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick(): void {
    this.activeModal.dismiss();
    this.authService.registerWithBuilder(
      this.email,
      this.password,
      this.firstName,
      this.lastName,
      this.builderComponentsService.website.getValue()
    );
  }

  onChangeUpdateFirstName(): void {
    this.showFirstNameInputError = !(this.firstName && this.firstName.length > 0);
    this.onChangeUpdateSaveButton();
  }

  onChangeUpdateLastName(): void {
    this.showLastNameInputError = !(this.lastName && this.lastName.length > 0);
    this.onChangeUpdateSaveButton();
  }

  onChangeUpdateEmail(): void {
    this.showEmailInputError = !(this.email && this.email.length > 0);
    this.onChangeUpdateSaveButton();
  }

  onChangeUpdatePassword(): void {
    this.showPasswordInputError = !(this.password && this.password.length > 0);
    this.onChangeUpdateSaveButton();
  }

  onChangeUpdateSaveButton(): void {
    this.disableSaveButton =
      this.showFirstNameInputError === false &&
      this.showLastNameInputError === false &&
      this.showEmailInputError === false &&
      this.showPasswordInputError === false;
  }
}
