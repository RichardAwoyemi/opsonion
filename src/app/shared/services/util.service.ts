import { Injectable } from '@angular/core';
import { IWebsite } from '../models/website';

@Injectable()
export class UtilService {
  static LEFT_WORDS = [
    'admiring',
    'adoring',
    'affectionate',
    'agitated',
    'amazing',
    'angry',
    'awesome',
    'blissful',
    'boring',
    'brave',
    'clever',
    'cocky',
    'compassionate',
    'competent',
    'condescending',
    'confident',
    'cranky',
    'dazzling',
    'determined',
    'distracted',
    'dreamy',
    'eager',
    'ecstatic',
    'elastic',
    'elated',
    'elegant',
    'eloquent',
    'epic',
    'fervent',
    'festive',
    'flamboyant',
    'focused',
    'friendly',
    'frosty',
    'gallant',
    'gifted',
    'goofy',
    'gracious',
    'happy',
    'hardcore',
    'heuristic',
    'hopeful',
    'hungry',
    'infallible',
    'inspiring',
    'jolly',
    'jovial',
    'keen',
    'kind',
    'laughing',
    'loving',
    'lucid',
    'mystifying',
    'modest',
    'musing',
    'naughty',
    'nervous',
    'nifty',
    'nostalgic',
    'objective',
    'optimistic',
    'peaceful',
    'pedantic',
    'pensive',
    'practical',
    'priceless',
    'quirky',
    'quizzical',
    'relaxed',
    'reverent',
    'romantic',
    'sad',
    'serene',
    'sharp',
    'silly',
    'sleepy',
    'stoic',
    'stupefied',
    'suspicious',
    'tender',
    'thirsty',
    'trusting',
    'unruffled',
    'upbeat',
    'vibrant',
    'vigilant',
    'vigorous',
    'wizardly',
    'wonderful',
    'xenodochial',
    'youthful',
    'zealous',
    'zen',
  ];
  static RIGHT_WORDS = [
    'albattani',
    'allen',
    'almeida',
    'agnesi',
    'archimedes',
    'ardinghelli',
    'aryabhata',
    'austin',
    'babbage',
    'banach',
    'bardeen',
    'bartik',
    'bassi',
    'beaver',
    'bell',
    'benz',
    'bhabha',
    'bhaskara',
    'blackwell',
    'bohr',
    'booth',
    'borg',
    'bose',
    'boyd',
    'brahmagupta',
    'brattain',
    'brown',
    'carson',
    'chandrasekhar',
    'shannon',
    'clarke',
    'colden',
    'cori',
    'cray',
    'curran',
    'curie',
    'darwin',
    'davinci',
    'dijkstra',
    'dubinsky',
    'easley',
    'edison',
    'einstein',
    'elion',
    'engelbart',
    'euclid',
    'euler',
    'fermat',
    'fermi',
    'feynman',
    'franklin',
    'galileo',
    'gates',
    'goldberg',
    'goldstine',
    'goldwasser',
    'golick',
    'goodall',
    'haibt',
    'hamilton',
    'hawking',
    'heisenberg',
    'hermann',
    'heyrovsky',
    'hodgkin',
    'hoover',
    'hopper',
    'hugle',
    'hypatia',
    'jackson',
    'jang',
    'jennings',
    'jepsen',
    'johnson',
    'joliot',
    'jones',
    'kalam',
    'kare',
    'keller',
    'kepler',
    'khorana',
    'kilby',
    'kirch',
    'knuth',
    'kowalevski',
    'lalande',
    'lamarr',
    'lamport',
    'leakey',
    'leavitt',
    'lewin',
    'lichterman',
    'liskov',
    'lovelace',
    'lumiere',
    'mahavira',
    'mayer',
    'mccarthy',
    'mcclintock',
    'mclean',
    'mcnulty',
    'meitner',
    'meninsky',
    'mestorf',
    'minsky',
    'mirzakhani',
    'morse',
    'murdock',
    'neumann',
    'newton',
    'nightingale',
    'nobel',
    'noether',
    'northcutt',
    'noyce',
    'panini',
    'pare',
    'pasteur',
    'payne',
    'perlman',
    'pike',
    'poincare',
    'poitras',
    'ptolemy',
    'raman',
    'ramanujan',
    'ride',
    'montalcini',
    'ritchie',
    'roentgen',
    'rosalind',
    'saha',
    'sammet',
    'shaw',
    'shirley',
    'shockley',
    'sinoussi',
    'snyder',
    'spence',
    'stallman',
    'stonebraker',
    'swanson',
    'swartz',
    'swirles',
    'tereshkova',
    'tesla',
    'thompson',
    'torvalds',
    'turing',
    'varahamihira',
    'visvesvaraya',
    'volhard',
    'villani',
    'wescoff',
    'wiles',
    'williams',
    'wilson',
    'wing',
    'wozniak',
    'wright',
    'yalow',
    'yonath',
  ];

  static toTitleCase(str: string, leaveCapitals = false): string {
    str = str.replace(/^\s+|\s+$/gm, '');
    return str.replace(/\w\S*/g, function (txt) {
      if (leaveCapitals) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      } else {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    });
  }

  static convertBytesToKb(bytes: number): number {
    return bytes / Math.pow(1024, 1);
  }

  static convertBytesToMb(bytes: number): number {
    return bytes / Math.pow(1024, 2);
  }

  static convertBytesToGb(bytes: number): number {
    return bytes / Math.pow(1024, 3);
  }

  static camelCaseToSelector(str: string): string {
    return str.replace(/[A-Z]/g, function (match) {
      return '-' + match.toLowerCase();
    });
  }

  static isNullOrWhitespace(text: string): boolean {
    return !text || !text.trim();
  }

  static removeWhitespace(text: string): string {
    return text.replace(/\s/g, '');
  }

  static generateRandomString(length: number): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    if (!length) {
      length = Math.floor(Math.random() * chars.length);
    }
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  static createYearRange(start: string, end: string): number[] {
    const s = new Date(start);
    const startYear = s.getFullYear();
    const e = new Date(end);
    const endYear = e.getFullYear();
    const arr = [];
    for (let i = startYear; i <= endYear; i++) {
      arr.push(i);
    }
    return arr;
  }

  static copyMessage(referralUrl: string): void {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.style.left = '0';
    selectBox.style.top = '0';
    selectBox.style.opacity = '0';
    selectBox.value = referralUrl;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
    return;
  }

  static generateRandomWord(): string {
    const words = this.LEFT_WORDS;
    return this.titleCase(words[Math.floor(Math.random() * words.length)]);
  }

  static titleCase(str: string): string {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  static generateGreeting(): string {
    const date = new Date();
    const hrs = date.getHours();
    let greeting = null;
    if (hrs < 12) {
      greeting = 'Good morning';
    } else if (hrs >= 12 && hrs <= 17) {
      greeting = 'Good afternoon';
    } else if (hrs >= 17 && hrs <= 24) {
      greeting = 'Good evening';
    }
    return greeting;
  }

  static generateWebsiteName(): string {
    const left = this.LEFT_WORDS;
    const right = this.RIGHT_WORDS;
    return (
      left[Math.floor(Math.random() * left.length)] +
      '-' +
      right[Math.floor(Math.random() * left.length)] +
      '-' +
      Math.floor(10000000 + Math.random() * 90000000)
    );
  }

  static openUrlInNewTab(url: string): void {
    window.open(url, '_blank');
  }

  static shallowClone = <T>(original: T): T => JSON.parse(JSON.stringify(original));

  static getDeepProp<T>(original: T, props: string): T {
    return props.split('.').reduce(function (acc, p) {
      if (acc == null) {
        return;
      }
      return acc[p];
    }, original);
  }

  static rgbAToHex(rgb: string): string {
    if (rgb.indexOf('rgb') > -1) {
      const result = rgb.match(/\d+/g);
      return result && result.length === 3
        ? '#' +
            ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) +
            ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2)
        : '';
    } else {
      return rgb;
    }
  }

  static hexToRgbA(hex: string): string {
    let c;
    if (hex.charAt(0) === '#') {
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return (
          // eslint-disable-next-line no-bitwise
          'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
        );
      }
    } else {
      return hex;
    }
  }

  static findAllByKey(website: IWebsite, keyToFind: string): Array<string> {
    return (
      Object.entries(website).reduce(
        (acc, [key, value]) =>
          key === keyToFind
            ? acc.concat(value)
            : typeof value === 'object' && value
            ? acc.concat(UtilService.findAllByKey(value, keyToFind))
            : acc,
        []
      ) || []
    );
  }

  static generateRandomBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  static rgbToHex(rgb: string): string {
    if (rgb.indexOf('rgb') > -1) {
      const numberArray = rgb.match(/\d+/g);
      return (
        '#' +
        this.componentToHex(+numberArray[0]) +
        this.componentToHex(+numberArray[1]) +
        this.componentToHex(+numberArray[2])
      );
    } else {
      return rgb;
    }
  }

  static componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  static designToComponent(website: IWebsite, componentNumber = 1): void {
    const component = website.pages[0].components[componentNumber];
    delete component.componentId;
    delete component.componentIndex;
    delete component.nearestComponentId;
    delete component.pageIndex;
    delete component.timestamp;
    component.elements.forEach((element) => {
      delete element.elementId;
      element.height = +element.height.toFixed(2);
      element.width = +element.width.toFixed(2);
      element.translate.x = +element.translate.x.toFixed(2);
      element.translate.y = +element.translate.y.toFixed(2);
    });
    console.log(JSON.stringify(component));
  }
}
