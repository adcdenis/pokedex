import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokeApiService } from '../../services/poke-api.service';
import { PokeHeaderComponent } from '../../shared/poke-header/poke-header.component';
import type { Pokemon, PokemonSpecies } from '../../models/pokemon.interface';
import { TYPE_COLORS } from '../../shared/poke-list/poke-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [PokeHeaderComponent, RouterModule, CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PokeApiService);

  pokemon = signal<Pokemon | null>(null);
  species = signal<PokemonSpecies | null>(null);
  isLoaded = signal(false);
  apiError = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.api.getPokemonDetails(id).subscribe({
      next: ([pokemon, species]) => {
        this.pokemon.set(pokemon);
        this.species.set(species);
        this.isLoaded.set(true);
      },
      error: () => {
        this.apiError.set(true);
      },
    });
  }

  getTypeColor(typeName: string): string {
    const colors = TYPE_COLORS[typeName] ?? TYPE_COLORS['normal'];
    return colors.primary;
  }

  getTypeGradient(): string {
    const types = this.pokemon()?.types;
    if (!types || types.length === 0) return 'linear-gradient(135deg, #A8A77A, #C6C6A7)';
    const primary = TYPE_COLORS[types[0].type.name] ?? TYPE_COLORS['normal'];
    if (types.length === 1) return `linear-gradient(135deg, ${primary.primary}, ${primary.secondary})`;
    const secondary = TYPE_COLORS[types[1].type.name] ?? primary;
    return `linear-gradient(135deg, ${primary.primary}, ${secondary.primary})`;
  }

  getEnglishName(): string {
    const names = this.species()?.names;
    if (!names) return '';
    const en = names.find((n) => n.language.name === 'en');
    return en ? en.name : names[0]?.name ?? '';
  }

  statName(name: string): string {
    const map: Record<string, string> = {
      hp: 'HP',
      attack: 'Ataque',
      defense: 'Defesa',
      'special-attack': 'Atq. Esp.',
      'special-defense': 'Def. Esp.',
      speed: 'Velocidade',
    };
    return map[name] ?? name;
  }
}
