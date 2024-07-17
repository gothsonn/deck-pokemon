import { Component, Input, ViewChild } from '@angular/core';
import { IgxDialogComponent, IgxDialogModule, IgxButtonModule, IgxRippleModule } from 'igniteui-angular';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  imports: [IgxDialogModule, IgxButtonModule, IgxRippleModule]
})
export class DialogComponent {
  @Input() title: string = 'Alerta';
  @Input() message: string = '';

  @ViewChild(IgxDialogComponent) public dialog!: IgxDialogComponent;

  public open() {
    this.dialog.open();
  }
}
