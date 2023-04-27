import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard-delete-website-modal',
  templateUrl: './dashboard-delete-website-modal.component.html',
})
export class DashboardDeleteWebsiteModalComponent implements IModalComponent {
  @Input() websiteName;
  @Input() websiteId;

  constructor(
    private afs: AngularFirestore,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService
  ) {}

  onCloseButtonClick(): void {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick(): void {
    const documentRef: AngularFirestoreDocument = this.afs.doc(`websites/${this.websiteId}`);
    documentRef.delete();
    this.activeModal.dismiss();
    this.toastrService.success('Your website has been deleted.', 'Great!');
  }
}
