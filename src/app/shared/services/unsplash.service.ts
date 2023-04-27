import { Injectable } from '@angular/core';
import Unsplash from 'unsplash-js';
import { environment } from '../../../environments/environment';
import { IUnsplashResponse } from '../models/unsplash';
import { Observable, ObservedValueOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UnsplashService {
  private readonly UNSPLASH_DUMMY_PHOTOS_FOLDER = './assets/data/web-dummy-photos';
  private readonly dummyUnsplashPhotos: Observable<IUnsplashResponse[]>;

  constructor(public httpClient: HttpClient) {
    this.dummyUnsplashPhotos = this.httpClient.get<IUnsplashResponse[]>(
      `${this.UNSPLASH_DUMMY_PHOTOS_FOLDER}/web-dummy-unsplash-photos.json`
    );
  }

  static getUnsplashApi(): Unsplash {
    return new Unsplash({
      accessKey: environment.unsplashAccessKey,
    });
  }

  static async searchImages(
    query: string,
    pageIndex = 1,
    elementsPerPage = 30
  ): Promise<IUnsplashResponse[]> {
    const response = await UnsplashService.getUnsplashApi().search.photos(
      query,
      pageIndex,
      elementsPerPage
    );
    const json = await response.json();
    return await json.results;
  }

  static async getPhotos(
    pageIndex = 1,
    elementsPerPage = 30,
    orderBy = 'latest'
  ): Promise<IUnsplashResponse[]> {
    const response = await UnsplashService.getUnsplashApi().photos.listPhotos(
      pageIndex,
      elementsPerPage,
      orderBy
    );
    return await response.json();
  }

  getDummyPhotos(): Observable<ObservedValueOf<Observable<IUnsplashResponse[]>>> {
    return this.dummyUnsplashPhotos;
  }
}
