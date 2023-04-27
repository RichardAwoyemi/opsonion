import { Injectable } from '@angular/core';
import { FontsService } from '../../../../shared/services/fonts.service';
import { UtilService } from '../../../../shared/services/util.service';
import ColorScheme from 'color-scheme';
import { ISidebarTextItem, ISidebarTextItemStyle } from './builder-sidebar-text';

@Injectable()
export class BuilderSidebarTextService {
  constructor(private fontsService: FontsService) {}

  async generateRandomTextItems(count: number, term = null): Promise<ISidebarTextItem[]> {
    const availableFontResponses = [];
    const allAvailableFonts = this.fontsService.fonts.getValue();
    let allAvailableTerms = UtilService.LEFT_WORDS;
    if (term) {
      allAvailableTerms = term;
    }

    for (let i = 0; i < count; i++) {
      const availableFontResponse = await this.generateSvgPathResponse(
        allAvailableFonts,
        allAvailableTerms
      );
      if (this.isValidFontResponse(availableFontResponse.svg)) {
        availableFontResponse.svg = availableFontResponse.svg.replace('null', '');
        availableFontResponses.push(availableFontResponse);
      }
    }
    return availableFontResponses;
  }

  isValidFontResponse(availableFontResponse: string): boolean {
    return !(
      availableFontResponse.indexOf('path') === -1 ||
      availableFontResponse.indexOf('M 12 15 L 0 15 L 0 0') > -1 ||
      availableFontResponse.indexOf('M 17.28 14.16 L 15.126') > -1 ||
      availableFontResponse.indexOf('M 18.72 14.16 L 16.56') > -1 ||
      availableFontResponse.indexOf('M 2.16 14.16 L 0 14.16') > -1 ||
      availableFontResponse.indexOf('M 9.609 17.133 L 0 17.133') > -1 ||
      availableFontResponse.indexOf('M 17.28 14.16 L 15.12 14.16') > -1 ||
      availableFontResponse.indexOf('M 15.84 14.16 L 13.68 14.16') > -1 ||
      availableFontResponse.indexOf('M 3.6 14.16 L 1.44 14.16 L 1.44') > -1 ||
      availableFontResponse.indexOf('M 23.04 14.16 L 20.16 14.16') > -1
    );
  }

  async generateSvgPathResponse(
    allAvailableFonts: googleFonts.WebfontList,
    allAvailableTerms: string[]
  ): Promise<ISidebarTextItem> {
    const selectedRandomTerm =
      allAvailableTerms[Math.floor(Math.random() * allAvailableTerms.length)];

    const selectedRandomFont =
      allAvailableFonts.items[Math.floor(Math.random() * allAvailableFonts.items.length)];
    let selectedRandomFontVariant = selectedRandomFont.variants[0];
    if (selectedRandomFont.variants.length > 1) {
      selectedRandomFontVariant =
        selectedRandomFont.variants[Math.floor(Math.random() * selectedRandomFont.variants.length)];
    }
    const selectedRandomFontUrl = selectedRandomFont.files[selectedRandomFontVariant];

    const colours = this.generateRandomColourScheme();
    let selectedRandomFillColor = '#fff';
    let selectedRandomStrokeColor = '#fff';
    if (UtilService.generateRandomBoolean()) {
      selectedRandomFillColor = `#${colours[Math.floor(Math.random() * colours.length)]}`;
      selectedRandomStrokeColor = `#${colours[Math.floor(Math.random() * colours.length)]}`;
    }

    let selectedRandomStyle: ISidebarTextItemStyle = {
      inlineStyle: {
        ['font-size']: '2vw',
      },
      displayStyle: null,
    };
    if (UtilService.generateRandomBoolean()) {
      if (selectedRandomFillColor !== '#fff') {
        selectedRandomStyle = this.generateRandomStyle(colours);
      }
    }

    selectedRandomStyle = this.setSelectedRandomStyle(
      selectedRandomStyle,
      selectedRandomFillColor,
      selectedRandomStrokeColor
    );

    return await this.getRenderGoogleFontToSvgPathResponse(
      selectedRandomFont,
      selectedRandomFontUrl,
      selectedRandomTerm,
      24,
      selectedRandomFillColor,
      selectedRandomStrokeColor,
      selectedRandomStyle
    );
  }

  setSelectedRandomStyle(
    selectedRandomStyle: ISidebarTextItemStyle,
    selectedRandomFillColor: string,
    selectedRandomStrokeColor: string
  ): ISidebarTextItemStyle {
    if (selectedRandomFillColor === '#fff') {
      selectedRandomStyle.inlineStyle.color = '#000';
    } else {
      selectedRandomStyle.inlineStyle.color = selectedRandomFillColor;
    }
    if (selectedRandomStrokeColor === '#fff') {
      selectedRandomStyle.inlineStyle['-webkit-text-stroke-color'] = '#000';
    } else {
      selectedRandomStyle.inlineStyle['-webkit-text-stroke-color'] = selectedRandomStrokeColor;
      selectedRandomStyle.inlineStyle['-webkit-text-stroke-width'] = '1px';
    }
    selectedRandomStyle.inlineStyle['font-size'] = '3vw';
    return selectedRandomStyle;
  }

  generateRandomStyle(colours: string[]): ISidebarTextItemStyle {
    const styles: ISidebarTextItemStyle[] = [
      {
        displayStyle: 'filter:drop-shadow(1px -1.5px 0px #) drop-shadow(-1px 1.5px 0px #);',
        inlineStyle: {
          'text-shadow': '# 1px -1.5px 0px, # -1px 1.5px 0px',
        },
      },
      {
        displayStyle: 'filter:drop-shadow(1.5px -1px 0px #);',
        inlineStyle: {
          'text-shadow': '# 1.5679px -1.05756px 0px',
        },
      },
      {
        displayStyle:
          'filter:drop-shadow(0px 0px 6px #) drop-shadow(0px 0px 6px #) drop-shadow(0px 0px 6px #);',
        inlineStyle: {
          'text-shadow': '# 0px 0px 6px, # 0px 0px 6px, # 0px 0px 6px',
        },
      },
    ];
    const style = styles[Math.floor(Math.random() * styles.length)];
    if (UtilService.generateRandomBoolean()) {
      return this.setFontHexColour(style, colours);
    } else {
      const rgbaColor = UtilService.hexToRgbA(
        `#${colours[Math.floor(Math.random() * colours.length)]}`
      );
      return this.setFontRgbaColour(style, rgbaColor);
    }
  }

  setFontHexColour(style: ISidebarTextItemStyle, colours: string[]): ISidebarTextItemStyle {
    style.displayStyle = style.displayStyle.replace(/#/g, () =>
      UtilService.hexToRgbA(`#${colours[Math.floor(Math.random() * colours.length)]}`)
    );
    style.inlineStyle['text-shadow'] = style.inlineStyle['text-shadow'].replace(/#/g, () =>
      UtilService.hexToRgbA(`#${colours[Math.floor(Math.random() * colours.length)]}`)
    );
    return style;
  }

  setFontRgbaColour(style: ISidebarTextItemStyle, rgbaColor: string): ISidebarTextItemStyle {
    style.displayStyle = style.displayStyle.replace(/#/g, rgbaColor);
    style.inlineStyle['text-shadow'] = style.inlineStyle['text-shadow'].replace(/#/g, rgbaColor);
    return style;
  }

  generateRandomColourScheme(): ColorScheme {
    const schemes = ['mono', 'contrast', 'triade', 'tetrade', 'analogic'];
    const variations = ['default', 'pastel', 'soft', 'light', 'hard', 'pale'];
    const scheme = new ColorScheme();
    scheme
      .from_hue(Math.floor(Math.random() * 101))
      .scheme(schemes[Math.floor(Math.random() * schemes.length)])
      .distance(Math.random())
      .add_complement(false)
      .variation(variations[Math.floor(Math.random() * variations.length)])
      .web_safe(true);
    return scheme.colors();
  }

  async getRenderGoogleFontToSvgPathResponse(
    googleFont: googleFonts.WebfontFamily,
    url: string,
    text: string,
    size: number,
    fill: string,
    stroke: string,
    style: ISidebarTextItemStyle
  ): Promise<ISidebarTextItem> {
    return await FontsService.renderGoogleFontToSvgPath(
      googleFont,
      url,
      text,
      size,
      fill,
      stroke,
      style
    );
  }
}
