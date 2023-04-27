import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';
import { FormPhotoUploadService } from './form-photo-upload.service';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/shared/user.reducer';
import { IUser } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { HTMLInputEvent } from '../../models/html-input-event';

@Component({
  selector: 'app-form-photo-upload',
  templateUrl: './form-photo-upload.component.html',
  styleUrls: ['./form-photo-upload.component.css'],
})
export class FormPhotoUploadComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  user: IUser = {
    photoURL: '/assets/img/anonymous.jpg',
  };
  hideImageProfilePicture = false;

  constructor(
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private formPhotoUploadService: FormPhotoUploadService,
    private breakpointObserver: BreakpointObserver,
    private userStore: Store<fromUser.State>
  ) {}

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.userStore
      .select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });
  }

  fileChangeEvent(event: Event): void {
    this.formPhotoUploadService.event = (event as unknown) as HTMLInputEvent;
    if (
      ((event as unknown) as HTMLInputEvent).target.files &&
      ((event as unknown) as HTMLInputEvent).target.files.length
    ) {
      this.openCropImageModal();
    } else {
      this.toastrService.warning('Please select a photo to upload.', 'Oops!');
    }
  }

  setupUserProfilePhoto(): { [key: string]: string } {
    if (this.isMobile['matches']) {
      return { 'padding-bottom': '1em', 'text-align': 'center' };
    } else {
      return { 'text-align': 'center' };
    }
  }

  openCropImageModal(): void {
    this.modalService.open(CropImageModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
      size: 'lg',
    });
  }

  handleImageError(): void {
    this.hideImageProfilePicture = true;
  }
}
