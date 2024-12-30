import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { IResponseDto } from '@eik/shared';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  getPeople(page: number, value?: string): Observable<IResponseDto> {
    let params = new HttpParams();
    if (value) {
      params = params.append('value', value);
    }
    if (page) {
      params = params.append('page', page.toString());
    }
    return this.http.get<IResponseDto>(`/api`, { params });
  }

  async getPeoplePromise(page: number, value?: string): Promise<IResponseDto> {
    return lastValueFrom(this.getPeople(page, value));
  }
}
