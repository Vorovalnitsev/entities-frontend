import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entity } from './model/entity-model'; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor(private http: HttpClient,) { }

  getActualEntities (): Observable<Entity[]> {
    return this.http.get<Entity[]>('http://localhost:3000/actual-entities');
  }

  getEntityById (id: string): Observable<Entity[]> {
    return this.http.get<Entity[]>(`http://localhost:3000/entity/${id}`);
  }
  getEntityByIdAfterDate (id: string, date: string): Observable<Entity[]> {
    return this.http.get<Entity[]>(`http://localhost:3000/entity/${id}/${date}`);
  }
}
