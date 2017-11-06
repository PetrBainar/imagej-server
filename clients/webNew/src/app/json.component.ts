import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface ItemsResponse {
  results: string[];
}

@Component({
  selector: 'app-component-json',
  templateUrl: './json.component.html'
})

export class JsonComponent implements OnInit {

  private url = 'http://localhost:8080/modules';
  results: string[];

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    this.http.get(this.url)
      .subscribe(
        data => this.nextCallback(data),
        (err: HttpErrorResponse) => this.errorCallback(err)
      );
  }

  nextCallback(data): void {
    this.results = data;
  }

  errorCallback(err: HttpErrorResponse): void {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
  }
}
