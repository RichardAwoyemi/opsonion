import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilService } from '../../../../shared/services/util.service';
import { ISidebarSearchInputMessage } from './builder-sidebar-search-input';

@Component({
  selector: 'app-builder-sidebar-search-input',
  templateUrl: './builder-sidebar-search-input.component.html',
  styleUrls: ['./builder-sidebar-search-input.component.css'],
})
export class BuilderSidebarSearchInputComponent {
  @Input() searchText;
  @Input() tabName;
  @Input() placeholderText;
  @Output() onSearchTextChange = new EventEmitter();

  emitSearchInputValue(): void {
    const searchInputMessage: ISidebarSearchInputMessage = {
      message: this.searchText,
      recipient: this.tabName,
    };
    this.onSearchTextChange.emit(searchInputMessage);
  }

  trimSearchInputValue(): void {
    if (!UtilService.isNullOrWhitespace(this.searchText)) {
      this.searchText.trim();
      this.emitSearchInputValue();
    }
  }

  clearSearchInputValue(): void {
    this.searchText = '';
    this.emitSearchInputValue();
  }
}
