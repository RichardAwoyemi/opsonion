import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, ObservedValueOf } from 'rxjs';

@Injectable()
export class BlacklistService {
  private readonly BLACKLIST_TERMS_FOLDER = './assets/data/web-blacklist-terms';
  private readonly blacklistArabicTerms: Observable<IBlacklist>;
  private readonly blacklistChineseTerms: Observable<IBlacklist>;
  private readonly blacklistCzechTerms: Observable<IBlacklist>;
  private readonly blacklistDanishTerms: Observable<IBlacklist>;
  private readonly blacklistDutchTerms: Observable<IBlacklist>;
  private readonly blacklistEnglishTerms: Observable<IBlacklist>;
  private readonly blacklistEsperantoTerms: Observable<IBlacklist>;
  private readonly blacklistFilipinoTerms: Observable<IBlacklist>;
  private readonly blacklistFinnishTerms: Observable<IBlacklist>;
  private readonly blacklistFrenchTerms: Observable<IBlacklist>;
  private readonly blacklistGermanTerms: Observable<IBlacklist>;
  private readonly blacklistHindiTerms: Observable<IBlacklist>;
  private readonly blacklistHungarianTerms: Observable<IBlacklist>;
  private readonly blacklistItalianTerms: Observable<IBlacklist>;
  private readonly blacklistJapaneseTerms: Observable<IBlacklist>;
  private readonly blacklistKabyleTerms: Observable<IBlacklist>;
  private readonly blacklistKlingonTerms: Observable<IBlacklist>;
  private readonly blacklistKoreanTerms: Observable<IBlacklist>;
  private readonly blacklistNorwegianTerms: Observable<IBlacklist>;
  private readonly blacklistPersianTerms: Observable<IBlacklist>;
  private readonly blacklistPolishTerms: Observable<IBlacklist>;
  private readonly blacklistPortugeuseTerms: Observable<IBlacklist>;
  private readonly blacklistRussianTerms: Observable<IBlacklist>;
  private readonly blacklistSpanishTerms: Observable<IBlacklist>;
  private readonly blacklistSwedishTerms: Observable<IBlacklist>;
  private readonly blacklistThaiTerms: Observable<IBlacklist>;
  private readonly blacklistTurkishTerms: Observable<IBlacklist>;

  constructor(public httpClient: HttpClient) {
    this.blacklistArabicTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/ar.json`
    );
    this.blacklistChineseTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/zh.json`
    );
    this.blacklistCzechTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/cs.json`
    );
    this.blacklistDanishTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/da.json`
    );
    this.blacklistDutchTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/nl.json`
    );
    this.blacklistEnglishTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/en.json`
    );
    this.blacklistEsperantoTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/eo.json`
    );
    this.blacklistFilipinoTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/fil.json`
    );
    this.blacklistFrenchTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/fr.json`
    );
    this.blacklistFinnishTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/fi.json`
    );
    this.blacklistGermanTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/de.json`
    );
    this.blacklistHindiTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/hi.json`
    );
    this.blacklistHungarianTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/hu.json`
    );
    this.blacklistItalianTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/it.json`
    );
    this.blacklistJapaneseTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/ja.json`
    );
    this.blacklistKabyleTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/kab.json`
    );
    this.blacklistKlingonTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/tlh.json`
    );
    this.blacklistKoreanTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/ko.json`
    );
    this.blacklistNorwegianTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/no.json`
    );
    this.blacklistPersianTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/fa.json`
    );
    this.blacklistPolishTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/pl.json`
    );
    this.blacklistPortugeuseTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/pt.json`
    );
    this.blacklistRussianTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/ru.json`
    );
    this.blacklistSpanishTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/es.json`
    );
    this.blacklistSwedishTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/sv.json`
    );
    this.blacklistThaiTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/th.json`
    );
    this.blacklistTurkishTerms = this.httpClient.get<IBlacklist>(
      `${this.BLACKLIST_TERMS_FOLDER}/tr.json`
    );
  }

  static checkAgainstBlacklist(blacklistTerms: string[], term: string): boolean {
    return blacklistTerms.some((word) =>
      new RegExp(
        String.raw`(?:^|(?!\w)[\u0000-\u007f])${word}(?:$|(?!\w)[\u0000-\u007f])`,
        'im'
      ).test(term)
    );
  }

  public getAllBlackListTerms(): Observable<ObservedValueOf<Observable<IBlacklist>>[]> {
    return combineLatest([
      this.blacklistArabicTerms,
      this.blacklistChineseTerms,
      this.blacklistCzechTerms,
      this.blacklistDanishTerms,
      this.blacklistDutchTerms,
      this.blacklistEnglishTerms,
      this.blacklistEsperantoTerms,
      this.blacklistFilipinoTerms,
      this.blacklistFinnishTerms,
      this.blacklistFrenchTerms,
      this.blacklistGermanTerms,
      this.blacklistHindiTerms,
      this.blacklistHungarianTerms,
      this.blacklistItalianTerms,
      this.blacklistJapaneseTerms,
      this.blacklistKabyleTerms,
      this.blacklistKlingonTerms,
      this.blacklistKoreanTerms,
      this.blacklistNorwegianTerms,
      this.blacklistPersianTerms,
      this.blacklistPolishTerms,
      this.blacklistPortugeuseTerms,
      this.blacklistRussianTerms,
      this.blacklistSpanishTerms,
      this.blacklistSwedishTerms,
      this.blacklistThaiTerms,
      this.blacklistTurkishTerms,
    ]);
  }
}

export interface IBlacklist {
  blacklist: string[];
}
