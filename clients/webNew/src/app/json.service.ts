import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class JsonService {

  constructor(private http: HttpClient) {  }

  getJsonData(url: string): Observable<Array<string>> {
    return this.http.get(url);
  }

  postFormData(url: string, formData: FormData): Observable<Object> {
    return this.http.post(url, formData);
  }
}
