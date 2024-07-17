import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Deck } from '../models/deck.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private readonly localStorageKey = 'decks';
  private readonly decks: BehaviorSubject<Deck[]>; // Declaração correta como BehaviorSubject<Deck[]>

  decks$: BehaviorSubject<Deck[]>; // Declarar decks$ como BehaviorSubject<Deck[]>

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.decks = new BehaviorSubject<Deck[]>(this.loadDecksFromLocalStorage());
    this.decks$ = this.decks; // Atribuir decks diretamente
  }

  addDeck(deck: Deck) {
    const currentDecks = this.decks.getValue();
    const updatedDecks = [...currentDecks, deck];
    this.updateDecks(updatedDecks);
  }

  updateDeck(updatedDeck: Deck) {
    const currentDecks = this.decks.getValue().map((d) =>
      d.id === updatedDeck.id ? updatedDeck : d
    );
    this.updateDecks(currentDecks);
  }

  removeDeck(id: string) {
    const currentDecks = this.decks.getValue().filter((d) => d.id !== id);
    this.updateDecks(currentDecks);
  }

  getAllDecks(): Deck[] {
    this.decks.next(this.loadDecksFromLocalStorage());
    return this.decks.getValue();
  }

  getDeck(id: string): Deck | undefined {
    return this.decks.getValue().find((d) => d.id === id);
  }

  private updateDecks(updatedDecks: Deck[]) {
    this.decks.next(updatedDecks);
    this.saveDecksToLocalStorage(updatedDecks);
  }

  private loadDecksFromLocalStorage(): Deck[] {
    if (isPlatformBrowser(this.platformId)) {
      const decksJson = localStorage.getItem(this.localStorageKey);
      return decksJson ? JSON.parse(decksJson) : [];
    }
    return [];
  }

  private saveDecksToLocalStorage(decks: Deck[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(decks));
    }
  }
}
