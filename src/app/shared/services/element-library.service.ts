import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IElement } from '../models/element';

@Injectable()
export class ElementLibraryService {
  private IMAGE_ELEMENT_LIBRARY = './assets/data/element-library/img-element-library.json';
  private BUTTON_ELEMENT_LIBRARY = './assets/data/element-library/btn-element-library.json';

  constructor(private httpClient: HttpClient) {}

  getImageElementLibrary(): Observable<IElement> {
    return this.httpServiceRequest(this.IMAGE_ELEMENT_LIBRARY);
  }

  getButtonElementLibrary(): Observable<IElement> {
    return this.httpServiceRequest(this.BUTTON_ELEMENT_LIBRARY);
  }

  private httpServiceRequest(location: string): Observable<IElement> {
    return this.httpClient.get(location);
  }
}
