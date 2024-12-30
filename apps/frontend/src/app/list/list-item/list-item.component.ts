import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPeople } from '@eik/shared';

@Component({
  selector: 'app-list-item',
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  item = input.required<IPeople>();
}
