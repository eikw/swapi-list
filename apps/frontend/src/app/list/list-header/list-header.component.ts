import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-header',
  imports: [CommonModule],
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListHeaderComponent {}
