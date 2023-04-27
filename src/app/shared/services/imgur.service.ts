import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';
import { ImgurResponse } from '../models/imgur';
import { Observable } from 'rxjs';

@Injectable()
export class ImgurService {
  private readonly IMGUR_API_URL = 'https://api.imgur.com/3/image';
  private readonly IMGUR_CLIENT_ID = 'Client-ID bdcf0bd3f309141';

  constructor(private http: HttpClient) {}

  upload(upload: string | File, type = 'base64'): Observable<ImgurResponse> {
    const headers = new HttpHeaders().set('Authorization', `${this.IMGUR_CLIENT_ID}`);
    const formData = new FormData();
    formData.append('image', upload);
    formData.append('name', UtilService.generateRandomString(32));
    formData.append('type', type);
    return this.http.post<ImgurResponse>(`${this.IMGUR_API_URL}`, formData, {
      headers,
    });
  }

  delete(id: string): Observable<ImgurResponse> {
    const headers = new HttpHeaders().set('Authorization', `${this.IMGUR_CLIENT_ID}`);
    return this.http.delete<ImgurResponse>(`${this.IMGUR_API_URL}/${id}`, { headers });
  }
}
