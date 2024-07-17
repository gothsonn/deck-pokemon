import { Component } from '@angular/core';
import {
  IgxIconButtonDirective,
  IgxIconComponent,
  IgxNavbarModule, IgxNavDrawerItemDirective, IgxNavDrawerTemplateDirective,
  IgxNavigationDrawerComponent,
  IgxRippleDirective
} from 'igniteui-angular';
import { RouterModule } from '@angular/router';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [IgxNavbarModule, RouterModule, IgxRippleDirective, IgxIconButtonDirective, IgxIconComponent, IgxNavigationDrawerComponent, IgxNavDrawerTemplateDirective, IgxNavDrawerItemDirective, NgForOf]
})
export class NavbarComponent {
  public componentLinks = [
    {
      link: 'decks',
      name: 'Home'
    },
    {
      link: 'create',
      name: 'Criar'
    }
  ];
}
