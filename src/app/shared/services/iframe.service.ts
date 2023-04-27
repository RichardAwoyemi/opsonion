import { Injectable } from '@angular/core';

@Injectable()
export class IframeService {
  static loadIframeStyle(document: Document, href: string): void {
    if (document && !document.head.innerHTML.includes(href + '"')) {
      const style = document.createElement('link');
      style.href = href;
      style.rel = 'stylesheet';
      document.head.appendChild(style);
    }
  }

  static loadIframeCss(document: Document, href: string): void {
    const css = document.createElement('link');
    css.href = href;
    css.rel = 'stylesheet';
    css.type = 'text/css';
    document.head.appendChild(css);
  }

  static getIframeElement(elementId: string): Document {
    const iframe = document.getElementById(elementId) as HTMLIFrameElement;
    return iframe.contentDocument || iframe.contentWindow.document;
  }

  // noinspection JSUnusedGlobalSymbols
  static loadIframeJs(document: Document, src: string): void {
    const js = document.createElement('script');
    js.src = src;
    document.head.appendChild(js);
  }
}
