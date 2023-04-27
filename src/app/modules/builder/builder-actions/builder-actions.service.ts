import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWebsite } from '../../../shared/models/website';

@Injectable()
export class BuilderActionsService {
  activeLibrarySelectedImage = new BehaviorSubject<string>(null);
  activeLibrarySelectedImageAltText = new BehaviorSubject<string>(null);
  activeLibrarySearchText = new BehaviorSubject<string>(null);
  renameRenameWebsiteModalStatus = new BehaviorSubject<{ [key: string]: boolean }>({ open: false });

  static togglePageModalErrorMessage(pageName: string, website: IWebsite): boolean {
    pageName = pageName.trim();
    if (pageName.length === 0) {
      return false;
    } else {
      for (let i = 0; i < website.pages.length; i++) {
        if (pageName.toLowerCase() === website.pages[i].name.toLowerCase().trim()) {
          return true;
        }
      }
    }
    return false;
  }

  static toggleWebsiteModalSaveButton(websiteName: string): boolean {
    websiteName = websiteName.trim();
    return websiteName.length === 0;
  }

  static togglePageModalSaveButton(pageName: string, website: IWebsite): boolean {
    pageName = pageName.trim();
    if (pageName.length === 0) {
      return true;
    } else {
      for (let i = 0; i < website.pages.length; i++) {
        if (pageName.toLowerCase() === website.pages[i].name.toLowerCase().trim()) {
          return true;
        }
      }
    }
    return false;
  }
}
