import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BuilderComponentsService } from '../../modules/builder/builder-components/builder-components.service';
import {
  ISidebarTextItem,
  ISidebarTextItemStyle,
} from '../../modules/builder/builder-sidebar/builder-sidebar-text/builder-sidebar-text';
import { UtilService } from './util.service';
import fontNames from 'src/assets/data/web-fonts/web-fonts-names.json';
import opentype from 'opentype.js';
import makerjs from 'makerjs';
import fonts from 'src/assets/data/web-fonts/web-fonts.json';

@Injectable()
export class FontsService {
  static BASE_S3_FONT_URL = 'https://s3-eu-west-1.amazonaws.com/media.opsonion.com/fonts/black';
  BASE_GOOGLE_FONT_URL = 'https://fonts.googleapis.com/css2?family=';
  availableFonts = new BehaviorSubject<string[]>(fontNames);
  fonts = new BehaviorSubject<googleFonts.WebfontList>(fonts);
  fontUrl = new BehaviorSubject<string>(null);

  constructor(private builderComponentsService: BuilderComponentsService) {}

  static getFontUrl(fontName: string): string {
    return `${this.BASE_S3_FONT_URL}/${fontName}.svg`;
  }

  static async renderGoogleFontToSvgPath(
    googleFont: googleFonts.WebfontFamily,
    url: string,
    text: string,
    size: number,
    fill: string,
    stroke: string,
    style: ISidebarTextItemStyle
  ): Promise<ISidebarTextItem> {
    const union = false;
    const bezierAccuracy = 0;
    let svg = null;
    return new Promise((resolve) => {
      opentype.load(url, (err, font) => {
        const textModel = new makerjs.models.Text(font, text, size, union, false, bezierAccuracy);
        svg = makerjs.exporter.toSVG(textModel);
        svg = svg.replace('fill="none"', `fill="${fill}"`);
        svg = svg.replace('fill:none', `fill:${fill}`);
        svg = svg.replace('stroke="#000"', `stroke="${stroke}"`);
        svg = svg.replace('stroke:#000', `stroke:${stroke}`);
        if (style) {
          svg = svg.replace('<svg', `<svg style="${style}" `);
        }
        const metadata = {
          font: googleFont,
          url: url,
          text: text,
          size: size,
          fill: fill,
          stroke: stroke,
          style: style,
        };
        const svgData = {
          svg: svg,
          metadata: metadata,
        };
        resolve(svgData);
      });
    });
  }

  getActiveFonts(website = null): Array<string> {
    const baseGoogleFontUrl = this.BASE_GOOGLE_FONT_URL;
    const activeWebsite = website || this.builderComponentsService.website.getValue();
    if (activeWebsite) {
      const activeFontList = UtilService.findAllByKey(activeWebsite, 'font-family');
      return activeFontList.reduce(function (cleanFontName, dirtyFontName) {
        const googleFontUrl = `${baseGoogleFontUrl}${dirtyFontName.trim().replace(' ', '+')}`;
        if (cleanFontName.indexOf(googleFontUrl) === -1) {
          cleanFontName.push(googleFontUrl);
        }
        return cleanFontName;
      }, []);
    }
  }

  setActiveFonts(website = null): void {
    const activeWebsite = website || this.builderComponentsService.website.getValue();
    if (activeWebsite) {
      const activeFontList = UtilService.findAllByKey(activeWebsite, 'font-family');
      if (activeFontList) {
        activeFontList.forEach((font) => {
          this.addFont(font);
        });
      }
    }
  }

  addFont(name: string): void {
    this.fontUrl.next(this.BASE_GOOGLE_FONT_URL + name.trim().replace(' ', '+'));
  }
}
