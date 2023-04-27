import { NgModule } from '@angular/core';
import { FormPhotoUploadComponent } from './form-photo-upload.component';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormPhotoUploadService } from './form-photo-upload.service';

@NgModule({
  exports: [FormPhotoUploadComponent],
  imports: [CommonModule, ImageCropperModule],
  declarations: [FormPhotoUploadComponent, CropImageModalComponent],
  providers: [FormPhotoUploadService],
})
export class FormPhotoUploadModule {}
