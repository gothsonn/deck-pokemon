import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Card} from "../models/card.model";

@Injectable({
  providedIn: 'root',
})
export class PokemonTcgService {
  private apiUrl = 'https://api.pokemontcg.io/v2/cards';

  constructor(private http: HttpClient) {}

  getAllCards(page: number = 1, pageSize: number = 20): Observable<Card[]> {
    const url = `${this.apiUrl}?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url).pipe(
      map(response => response.data as Card[])
    );
  }
}
