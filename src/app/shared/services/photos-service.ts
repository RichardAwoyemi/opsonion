import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { S3_MEDIA_BUCKET_URL } from '../../modules/builder/builder';

@Injectable()
export class PhotosService {
  private static readonly S3_PHOTO_MEDIA_BUCKET_URL = `${S3_MEDIA_BUCKET_URL}/library/img-photo-categories`;
  private readonly PHOTOS_FOLDER = './assets/data/web-photos';
  private readonly photoCategoryTitles: Observable<IPhotoCategoryTitles[]>;

  constructor(public httpClient: HttpClient) {
    this.photoCategoryTitles = this.httpClient.get<IPhotoCategoryTitles[]>(
      `${this.PHOTOS_FOLDER}/photo-category-titles.json`
    );
  }

  public static preloadPhotos(
    photoUrls: IPhotoCategoryTitles[],
    imageUrl = this.S3_PHOTO_MEDIA_BUCKET_URL,
    imageFormat = 'jpg'
  ): HTMLImageElement[] {
    const photos = [];
    for (let i = 0; i < photoUrls.length; i++) {
      photos[i] = new Image();
      photos[i].src = `${imageUrl}/${photoUrls[i]}.${imageFormat}`;
    }
    return photos;
  }

  public getAllPhotoCategoryTitles(): Observable<
    ObservedValueOf<Observable<IPhotoCategoryTitles[]>>
  > {
    return this.photoCategoryTitles;
  }
}

export interface IPhotoCategoryTitles {
  photoCategoryTitles: string[];
}

export interface IPhotoCategory {
  title: string;
  image: HTMLImageElement;
}
