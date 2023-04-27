import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUploadFile } from 'src/app/shared/models/website';
import { UploadService } from 'src/app/shared/services/upload.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { HTMLInputEvent } from '../../../../shared/models/html-input-event';
import { ImgurResponse } from '../../../../shared/models/imgur';
import { IWebsite } from '../../../../shared/models/website';
import { ImgurService } from '../../../../shared/services/imgur.service';
import { ActiveDragType, ActiveSettings, ActiveUploadTypes } from '../../builder';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderService } from '../../builder.service';
import { IComponentMetadata } from '../../builder-components/builder-components';
import { BuilderElementsService } from '../../builder-elements/builder-elements.service';

@Component({
  selector: 'app-builder-sidebar-uploads',
  templateUrl: './builder-sidebar-uploads.component.html',
  styleUrls: ['./builder-sidebar-uploads.component.css'],
  animations: [
    trigger('hideAnimation', [
      state('loading', style({ opacity: 1 })),
      state('loaded', style({ opacity: 0, transform: 'scale(0)' })),
      transition('loading => loaded', [
        animate(
          '0ms 250ms',
          style({ opacity: 0, transform: 'scale(0)', height: 0, margin: 0, padding: 0 })
        ),
      ]),
    ]),
    trigger('checkboxFade', [
      state('active-checkbox', style({ opacity: 1, transform: 'scale(1)' })),
      state('inactive-checkbox', style({ opacity: '*', transform: 'scale(1)' })),
      transition('active-checkbox => inactive-checkbox', [
        animate('0ms 100ms', style({ opacity: 0, transform: 'scale(1)' })),
      ]),
      transition('inactive-checkbox => active-checkbox', [
        animate('0ms 100ms', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    trigger('selectedImageMenu', [
      state('show', style({ opacity: 1, height: '4rem', transform: 'translateY(0)' })),
      state('hide', style({ opacity: 0, height: '0rem', transform: 'translateY(2rem)' })),
      transition('show => hide', [
        animate('0ms 200ms', style({ height: '0rem', opacity: 0, transform: 'translateY(2rem)' })),
      ]),
      transition('hide => show', [
        animate('0ms 200ms', style({ opacity: 1, height: '4rem', transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class BuilderSidebarUploadsComponent implements OnInit, OnDestroy {
  @Input() tabName;
  @Input() activeSetting;
  @Input() activeComponentMetadata: IComponentMetadata;

  buttonText = 'Upload Image';
  website: IWebsite;
  images: IUploadFile[];
  uploadType = ActiveUploadTypes.Image;
  selectedImages = [];
  selectModeSettings = [];
  ngUnsubscribe = new Subject<void>();
  checkboxClass: string;
  selectModeImageClass: string;
  selectModeMenuState = 'hide';
  defaultUploadText = '...or drag one here from your desktop.';
  settingsName = ActiveSettings.Uploads;

  constructor(
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
    private builderElementsService: BuilderElementsService,
    private imgurService: ImgurService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.builderService.activeSetting.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.clearSelectMode();
      }
    });
  }

  preventDefault(e: Event): void {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  }

  fileUpload(e: Event): void {
    if (!this.builderService.activeDragData.getValue()) {
      this.fileIsSelectedFromBrowser(e);
      this.fileIsDraggedInFromDesktop(e);
    }
  }

  fileIsSelectedFromBrowser(e: Event): void {
    if (
      (e as HTMLInputEvent).target.files &&
      (e as HTMLInputEvent).target.files.length &&
      this.uploadService.checkFile(
        (e as HTMLInputEvent).target.files,
        ActiveUploadTypes.Image,
        true
      )
    ) {
      for (let i = 0; i < (e as HTMLInputEvent).target.files.length; i++) {
        const image = (e as HTMLInputEvent).target.files[i];
        this.uploadFile(image);
      }
      return;
    }
  }

  fileIsDraggedInFromDesktop(e: Event): void {
    if (
      (e as DragEvent).dataTransfer &&
      this.uploadService.checkFile(
        (e as DragEvent).dataTransfer.files,
        ActiveUploadTypes.Image,
        true
      )
    ) {
      for (let i = 0; i < (e as DragEvent).dataTransfer.files.length; i++) {
        const image = (e as DragEvent).dataTransfer.files[i];
        this.uploadFile(image);
      }
      return;
    }
  }

  uploadFile(file: File): void {
    const uploadKey = UtilService.generateRandomString(10);
    this.imgurService.upload(file, 'file').subscribe((imgurResponse: ImgurResponse) => {
      if (imgurResponse.status === 200) {
        this.uploadService.replaceUpload(ActiveUploadTypes.Image, {
          key: uploadKey,
          deleteHash: imgurResponse.data.deletehash,
          src: imgurResponse.data.link,
          uploadState: 'loaded',
        });
      }
    });
    this.previewFile(file, uploadKey);
  }

  previewFile(file: File, uploadKey: string): void {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (_event) => {
      const blob = new Blob([_event.target['result']]);
      const blobURL = window.URL.createObjectURL(blob);
      const image = new Image();
      image.src = blobURL;
      image.onload = () => {
        const resized = this.resizeBlobImage(image);
        this.uploadService.addUpload(ActiveUploadTypes.Image, {
          key: uploadKey,
          preview: resized,
          uploadState: 'loading',
          alt: '',
          style: {
            height: image.height + 'px',
            width: image.width + 'px',
          },
        });
      };
    };
  }

  resizeBlobImage(img: HTMLImageElement, maxHeight = 150, maxWidth = 300): string {
    const canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height *= maxWidth / width));
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width *= maxHeight / height));
        height = maxHeight;
      }
    }
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(img, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg');
  }

  onDragStart(e: DragEvent, image: IUploadFile): void {
    this.builderService.activeDragData.next({
      type: ActiveDragType.Image,
      [ActiveDragType.Image]: image,
    });
    const targetNode = e['path'][0];
    targetNode['src'] = image.src;
    e.dataTransfer.setDragImage(targetNode, 0, 0);
  }

  onDragEnd(): void {
    this.builderService.activeDragData.next(null);
  }

  trackByFn(index: number, image: IUploadFile): string {
    return image.key;
  }

  onCheckboxClick(e: MouseEvent, key: string): void {
    if (e.target['checked']) {
      this.selectedImages.push(key);
    } else {
      this.selectedImages = this.selectedImages.filter((image) => image !== key);
    }
    if (this.selectedImages.length) {
      this.checkboxClass = 'active-checkbox';
      this.selectModeImageClass = 'selected-overlay';
      this.selectModeMenuState = 'show';
    } else {
      this.checkboxClass = 'inactive-checkbox';
      this.selectModeImageClass = '';
      this.selectModeMenuState = 'hide';
    }
  }

  clearSelectMode(): void {
    this.selectedImages = [];
    this.checkboxClass = 'inactive-checkbox';
    this.selectModeImageClass = '';
    this.selectModeMenuState = 'hide';
    this.selectModeSettings = this.selectModeSettings.map((image) => ({
      ...image,
      ...{ checked: false },
    }));
  }

  onDeleteIconClick(): void {
    this.selectedImages.forEach((selection) => {
      const activeImage = this.images.filter((image) => image.key === selection)[0];
      this.imgurService.delete(activeImage.deleteHash).subscribe(() => {
        this.images = this.images.filter((image) => image !== activeImage);
        this.uploadService.saveUploads(ActiveUploadTypes.Image, this.images);
      });
    });
    this.clearSelectMode();
  }

  addElement(image: IUploadFile): void {
    if (this.activeComponentMetadata && this.activeComponentMetadata.component) {
      const imageHeight = +(image.style.height as string).match(/\d/g).join('');
      const imageWidth = +(image.style.width as string).match(/\d/g).join('');
      const elementWidth = 20;
      const elementHeight = elementWidth * (imageHeight / imageWidth);
      const translateX = 40;
      const translateY = this.activeComponentMetadata.component.height / 2 - elementHeight / 2;
      const newElement = this.builderElementsService.createElement(
        { type: ActiveDragType.Image, [ActiveDragType.Image]: image },
        elementHeight,
        elementWidth,
        translateX,
        translateY
      );
      this.builderComponentsService.setWebsiteElementByIndices(
        newElement,
        this.activeComponentMetadata.component.pageIndex,
        this.activeComponentMetadata.component.componentIndex
      );
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
