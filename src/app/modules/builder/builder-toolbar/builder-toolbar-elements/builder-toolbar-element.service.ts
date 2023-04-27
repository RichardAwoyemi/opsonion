import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IframeService } from '../../../../shared/services/iframe.service';
import { IWebsite } from '../../../../shared/models/website';
import { toolbarButton } from '../../builder';
import {
  IComponent,
  IComponentMetadata,
  IStyle,
  IToolbarColours,
} from '../../builder-components/builder-components';
import { ISectionElement } from '../../builder-components/builder-section/builder-section';
import { BuilderService } from '../../builder.service';
import { BehaviorSubject } from 'rxjs';
import { IElementSettings } from '../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';

@Injectable()
export class BuilderToolbarElementService {
  listState = new BehaviorSubject<string>(null);
  activeFontName = new BehaviorSubject<string>(null);
  activeToolbarElement = new BehaviorSubject<string>(null);
  activeToolbarColourSetting = new BehaviorSubject<{
    index: number;
    colour: string;
    setting: IToolbarColours;
  }>(null);
  MAX_LIST_COMMAND_INDEX = 2;
  ACTIVE_BUTTON_CLASS = 'toolbar-button toolbar-button-active';
  INACTIVE_BUTTON_CLASS = 'toolbar-button';

  constructor(private builderService: BuilderService, private toastrService: ToastrService) {}

  static getTextSelection(document: Document, commandName: string): boolean {
    if (commandName === 'insertUnorderedList' || commandName === 'insertOrderedList') {
      return true;
    } else {
      return document.getSelection().anchorOffset !== document.getSelection().focusOffset;
    }
  }

  setFormatButtonClass(
    commandName: string,
    showcaseDocument = IframeService.getIframeElement('builder-showcase')
  ): string {
    return showcaseDocument.queryCommandState(commandName)
      ? this.ACTIVE_BUTTON_CLASS
      : this.INACTIVE_BUTTON_CLASS;
  }

  setSidebarMenuButtonClass(menuItem: string): string {
    return this.builderService.activeSetting.getValue() === menuItem
      ? this.ACTIVE_BUTTON_CLASS
      : this.INACTIVE_BUTTON_CLASS;
  }

  applyFormatting(
    settings: IElementSettings = null,
    commandName: string,
    showcaseDocument: Document
  ): void {
    if (settings.name === toolbarButton.List) {
      showcaseDocument = showcaseDocument || IframeService.getIframeElement('builder-showcase');
      this.listState.next(this.getNewListState(showcaseDocument));
      commandName = this.listState.getValue() || 'insertOrderedList';
    } else if (!showcaseDocument.getSelection().toString()) {
      this.toastrService.warning('Please make a text selection before applying formatting.');
      return;
    }
    showcaseDocument.execCommand(commandName);
  }

  toggleListCommandToolbarStatus(showcaseDocument: Document): void {
    this.listState.next(null);
    if (showcaseDocument.queryCommandState('insertUnorderedList')) {
      this.listState.next('insertUnorderedList');
    } else if (showcaseDocument.queryCommandState('insertOrderedList')) {
      this.listState.next('insertOrderedList');
    } else {
      this.listState.next(null);
    }
  }

  getNewListState(showcaseDocument: Document): string {
    if (showcaseDocument.queryCommandState('insertOrderedList')) {
      return null;
    } else if (showcaseDocument.queryCommandState('insertUnorderedList')) {
      return 'insertOrderedList';
    } else {
      return 'insertUnorderedList';
    }
  }

  getComponent(website: IWebsite, componentMetadata: IComponentMetadata): IComponent {
    const component = componentMetadata.component;
    return website.pages[component.pageIndex].components[component.componentIndex];
  }

  getElement(componentMetaData: IComponentMetadata): ISectionElement {
    return componentMetaData.component.elements.find(
      (element) => element.elementId === componentMetaData.activeElementId
    );
  }

  getElementStyle(element: ISectionElement): IStyle {
    return element.data[element.type].style;
  }
}
