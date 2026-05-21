import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'poke-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss'],
})
export class PokeSearchComponent {
  @Output() searchChange = new EventEmitter<string>();
  searchTerm = '';

  onSearch(): void {
    this.searchChange.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchChange.emit('');
  }
}
