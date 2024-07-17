import {Component, OnInit} from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/deck.model';
import { Observable } from 'rxjs';
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {
  IGX_BUTTON_GROUP_DIRECTIVES,
  IGX_EXPANSION_PANEL_DIRECTIVES,
} from "igniteui-angular";
import {DeckDetailComponent} from "../deck-detail/deck-detail.component";

@Component({
  selector: 'app-deck-list',
  standalone: true,
  templateUrl: './deck-list.component.html',
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    AsyncPipe,
    DeckDetailComponent,
    IGX_EXPANSION_PANEL_DIRECTIVES,
    IGX_BUTTON_GROUP_DIRECTIVES
  ],
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {
  decks$: Observable<Deck[]> | undefined;

  constructor(private deckService: DeckService) {
    this.decks$ = this.deckService.decks$;
  }

  ngOnInit() {
    this.deckService.getAllDecks();
  }

  removeDeck(id: string) {
    this.deckService.removeDeck(id);
  }
}
