import {Component, Input, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/deck.model';
import { CommonModule } from '@angular/common';
import {IGX_CARD_DIRECTIVES} from "igniteui-angular";

@Component({
  selector: 'app-deck-detail',
  standalone: true,
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.css'],
  imports: [CommonModule, RouterLink, IGX_CARD_DIRECTIVES],
})
export class DeckDetailComponent implements OnInit {
  deck: Deck | undefined;
  @Input() deckId!: string;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    if (this.deckId) {
      this.deck = this.deckService.getDeck(this.deckId);
    }
  }

  get pokemonCount(): number {
    return this.deck?.cards.filter(card => card.supertype === 'Pokémon').length || 0;
  }

  get trainerCount(): number {
    return this.deck?.cards.filter(card => card.supertype === 'Trainer').length || 0;
  }

  get uniqueTypes(): number {
    const types = new Set(this.deck?.cards.flatMap(card => card.types));
    return types.size;
  }
}