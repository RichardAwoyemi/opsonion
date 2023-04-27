import { Injectable } from '@angular/core';
import themes from 'src/assets/data/web-themes/themes.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITheme } from '../models/theme';

@Injectable()
export class ThemeService {
  THEME_FILE = './assets/data/web-themes/themes.json';
  themeNames = new BehaviorSubject<string[]>(ThemeService.setThemeNames());
  themeList: Observable<ITheme[]>;

  constructor(public httpClient: HttpClient) {
    this.themeList = this.httpClient.get<ITheme[]>(`${this.THEME_FILE}`);
  }

  private static setThemeNames(): string[] {
    return themes.map((theme) => theme.name);
  }
}

export enum ActiveThemeSettings {
  PrimaryBackground = 'primary-background',
  PrimaryText = 'primary-text',
  SecondaryBackground = 'secondary-background',
  SecondaryText = 'secondary-text',
  ButtonBackground = 'button-background',
  ButtonBorder = 'button-border',
  ButtonText = 'button-text',
}
