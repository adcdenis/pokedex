import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private url: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon:any;

  constructor(
    private activateRouter: ActivatedRoute,
    private api: PokeApiService
  ) {}

  ngOnInit(): void {
    this.pokemons;
  }

  get pokemons() {
    const id = this.activateRouter.snapshot.params['id'];
    const pokemon = this.api.apiGetPokemons(`${this.url}/${id}`);
    const pokemonNome = this.api.apiGetPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, pokemonNome]).subscribe((res) => {
      this.pokemon = res;
    });
  }
}
