import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  Inject,
  PLATFORM_ID,
  WritableSignal,
  signal,
  ElementRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/deck.model';
import { Card } from '../../models/card.model';
import { v4 as uuidv4 } from 'uuid';
import { PokemonTcgService } from '../../services/pokemon-tcg.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IgxButtonModule,
  IgxRippleModule,
  IgxCardModule,
  IgxAvatarModule,
  IGX_INPUT_GROUP_DIRECTIVES,
  IgxExpansionPanelBodyComponent,
  IgxExpansionPanelComponent,
  IgxExpansionPanelHeaderComponent,
  IgxExpansionPanelTitleDirective,
  IGX_EXPANSION_PANEL_DIRECTIVES,
  IgxProgressBarModule
} from 'igniteui-angular';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DialogComponent } from '../dialog/dialog.component';
import {DeckDetailComponent} from "../deck-detail/deck-detail.component";

@Component({
  selector: 'app-deck-create',
  standalone: true,
  templateUrl: './deck-create.component.html',
  styleUrls: ['./deck-create.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    IgxButtonModule,
    IgxRippleModule,
    IgxCardModule,
    IgxAvatarModule,
    ScrollingModule,
    DialogComponent,
    IGX_INPUT_GROUP_DIRECTIVES,
    DeckDetailComponent,
    IgxExpansionPanelBodyComponent,
    IgxExpansionPanelComponent,
    IgxExpansionPanelHeaderComponent,
    IgxExpansionPanelTitleDirective,
    IGX_EXPANSION_PANEL_DIRECTIVES,
    IgxProgressBarModule,
  ],
  providers: [DeckService, PokemonTcgService]
})
export class DeckCreateComponent implements OnInit {
  @ViewChild('createHtml') mainElement!: ElementRef;
  deck: WritableSignal<Deck> = signal({ id: uuidv4(), name: '', cards: [] });
  searchResults: WritableSignal<Card[]> = signal([]);
  groupedCards: Card[][] = [];
  page: WritableSignal<number> = signal(1);
  pageSize: WritableSignal<number> = signal(20);
  cardsPerRow: number = 5;
  spinner: WritableSignal<boolean> = signal(true);

  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  @ViewChild(DialogComponent) dialog!: DialogComponent;
  dialogMessage: string = '';

  constructor(
    private deckService: DeckService,
    private pokemonTcgService: PokemonTcgService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateCardsPerRow();
    }
    this.getAllCards();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateCardsPerRow();
      this.groupCards();
    }
  }

  getAllCards() {
    this.spinner.set(true);
    this.pokemonTcgService.getAllCards(this.page(), this.pageSize()).subscribe(response => {
      this.searchResults.set([...this.searchResults(), ...response]);
      this.groupCards();
      this.spinner.set(false);
    });
  }

  addDeck() {
    if (!this.deck().name.trim()) {
      this.dialogMessage = 'O nome do baralho é obrigatório.';
      this.dialog.open();
    } else if (this.deck().cards.length < 24 || this.deck().cards.length > 60) {
      this.dialogMessage = 'O baralho deve conter entre 24 e 60 cartas.';
      this.dialog.open();
    } else {
      this.deckService.addDeck(this.deck());
      this.router.navigate(['/decks']);
    }
  }

  addCard(card: Card) {
    const cardCount = this.deck().cards.filter(c => c.name === card.name).length;
    if (cardCount >= 4) {
      this.dialogMessage = 'Não é possível adicionar mais de 4 cartas com o mesmo nome.';
      this.dialog.open();
    } else {
      this.deck().cards.push(card);
    }
  }

  onScrollIndexChange() {
    if (this.viewport.getRenderedRange().end === this.viewport.getDataLength()) {
      this.page.update((value) => value++);
      this.getAllCards();
    }
  }

  updateCardsPerRow() {
    if (isPlatformBrowser(this.platformId)) {
      const mainElement = document.querySelector('main');
      if(mainElement){
        const containerWidth = mainElement.clientWidth;
        const cardWidth = 250 + 16;
        const calculatedCardsPerRow = Math.floor(containerWidth / cardWidth);
        this.cardsPerRow = Math.min(calculatedCardsPerRow, 6);
      }

    }
  }

  groupCards() {
    this.groupedCards = [];
    for (let i = 0; i < this.searchResults().length; i += this.cardsPerRow) {
      this.groupedCards.push(this.searchResults().slice(i, i + this.cardsPerRow));
    }
  }
}
