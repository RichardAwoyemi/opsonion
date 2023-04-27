import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BuilderComponentsService } from 'src/app/modules/builder/builder-components/builder-components.service';
import { BuilderService } from 'src/app/modules/builder/builder.service';
import { ActiveDragType, ActiveUploadTypes } from '../../modules/builder/builder';
import { IUploadFile } from '../models/website';
import { UtilService } from './util.service';

@Injectable()
export class UploadService {
  constructor(
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
    private toastrService: ToastrService
  ) {}

  isInternalActiveDragEvent(
    dragType: ActiveDragType,
    activeDragData = this.builderService.activeDragData.getValue()
  ): boolean {
    return activeDragData && activeDragData['type'] === dragType;
  }

  checkFile(files: FileList, uploadType: ActiveUploadTypes, allowMultiple = false): boolean {
    let fileValid = true;
    fileValid = fileValid && this.checkFileCount(files, allowMultiple);
    fileValid = fileValid && this.checkFileType(files, uploadType);
    fileValid = fileValid && this.checkFileSize(files, uploadType);
    return fileValid;
  }

  checkFileCount(files: FileList | DataTransferItemList, allowMultiple = false): boolean {
    if (files.length < 1 || (!allowMultiple && files.length > 1)) {
      this.toastrService.warning('Please select a single file.', 'Oops');
      return false;
    }
    return true;
  }

  checkFileType(files: FileList | DataTransferItemList, uploadType: ActiveUploadTypes): boolean {
    if (uploadType === ActiveUploadTypes.Image) {
      for (let i = 0; i < files.length; i++) {
        if (!['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(files[i].type)) {
          this.toastrService.warning(
            'Please upload a file with the format: png, jpeg or jpg.',
            'Oops'
          );
          return false;
        }
      }
    }
    return true;
  }

  checkFileSize(files: FileList, uploadType: ActiveUploadTypes): boolean {
    if (uploadType === ActiveUploadTypes.Image) {
      for (let i = 0; i < files.length; i++) {
        if (UtilService.convertBytesToMb(files[i].size) > 5) {
          this.toastrService.warning('Please upload a file that’s smaller than 5MB', 'Oops');
          return false;
        }
      }
    }
    return true;
  }

  addUpload(
    uploadType: ActiveUploadTypes,
    uploadItem: IUploadFile,
    newWebsite = this.builderComponentsService.website.getValue()
  ): void {
    uploadItem['key'] = uploadItem['key'] || UtilService.generateRandomString(10);
    newWebsite['uploads'] = newWebsite['uploads'] || { images: [], videos: [] };
    newWebsite['uploads'][uploadType].push(uploadItem);
    this.builderComponentsService.website.next(newWebsite);
  }

  saveUploads(
    uploadType: ActiveUploadTypes,
    uploadItem: IUploadFile[],
    newWebsite = this.builderComponentsService.website.getValue()
  ): void {
    newWebsite['uploads'][uploadType] = uploadItem;
    this.builderComponentsService.website.next(newWebsite);
  }

  replaceUpload(
    uploadType: ActiveUploadTypes,
    uploadItem: IUploadFile,
    website = this.builderComponentsService.website.getValue()
  ): void {
    website['uploads'][uploadType] = website['uploads'][uploadType].map((image) => {
      if (image['key'] !== uploadItem['key']) {
        return image;
      } else {
        return { ...image, ...uploadItem };
      }
    });

    this.builderComponentsService.website.next(website);
  }
}
