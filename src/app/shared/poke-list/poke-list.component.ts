import { Component, inject, OnInit, signal, type WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokeApiService } from '../../services/poke-api.service';
import { PokeSearchComponent } from '../poke-search/poke-search.component';
import type { PokemonListItem, TypeColorMap } from '../../models/pokemon.interface';

export const TYPE_COLORS: TypeColorMap = {
  normal:   { primary: '#A8A77A', secondary: '#C6C6A7', text: '#fff' },
  fire:     { primary: '#EE8130', secondary: '#F5AC78', text: '#fff' },
  water:    { primary: '#6390F0', secondary: '#9DB7F5', text: '#fff' },
  electric: { primary: '#F7D02C', secondary: '#FAE078', text: '#333' },
  grass:    { primary: '#7AC74C', secondary: '#A7DB8D', text: '#fff' },
  ice:      { primary: '#96D9D6', secondary: '#BCE6E5', text: '#333' },
  fighting: { primary: '#C22E28', secondary: '#D55B56', text: '#fff' },
  poison:   { primary: '#A33EA1', secondary: '#C06BC0', text: '#fff' },
  ground:   { primary: '#E2BF65', secondary: '#EDD89E', text: '#333' },
  flying:   { primary: '#A98FF3', secondary: '#C6B7F8', text: '#fff' },
  psychic:  { primary: '#F95587', secondary: '#FB8AAD', text: '#fff' },
  bug:      { primary: '#A6B91A', secondary: '#C3D13A', text: '#fff' },
  rock:     { primary: '#B6A136', secondary: '#D1C06A', text: '#fff' },
  ghost:    { primary: '#735797', secondary: '#9B7FC0', text: '#fff' },
  dragon:   { primary: '#6F35FC', secondary: '#9B6DFD', text: '#fff' },
  dark:     { primary: '#705746', secondary: '#9B7D6B', text: '#fff' },
  steel:    { primary: '#B7B7CE', secondary: '#D1D1E0', text: '#333' },
  fairy:    { primary: '#D685AD', secondary: '#E6B3CC', text: '#fff' },
};

@Component({
  selector: 'poke-list',
  standalone: true,
  imports: [PokeSearchComponent, RouterModule, CommonModule],
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  private readonly api = inject(PokeApiService);

  allPokemons: WritableSignal<PokemonListItem[]> = signal([]);
  private allPokemonsOriginal: PokemonListItem[] = [];
  apiError = signal(false);
  isLoading = signal(true);

  ngOnInit(): void {
    this.api.getPokemonList().subscribe({
      next: (pokemons) => {
        this.allPokemons.set(pokemons);
        this.allPokemonsOriginal = pokemons;
        this.isLoading.set(false);
      },
      error: () => {
        this.apiError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  getTypeColor(typeName: string): { background: string; color: string } {
    const colors = TYPE_COLORS[typeName] ?? TYPE_COLORS['normal'];
    return {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
      color: colors.text,
    };
  }

  onSearch(term: string): void {
    if (!term) {
      this.allPokemons.set(this.allPokemonsOriginal);
      return;
    }
    const lower = term.toLowerCase();
    const filtered = this.allPokemonsOriginal.filter((p) =>
      p.name.toLowerCase().includes(lower)
    );
    this.allPokemons.set(filtered);
  }
}
