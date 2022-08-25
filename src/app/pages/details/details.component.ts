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

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activateRouter: ActivatedRoute,
    private api: PokeApiService
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  public getPokemons() {
    const id = this.activateRouter.snapshot.params['id'];
    const pokemon = this.api.apiGetPokemons(`${this.url}/${id}`);
    const pokemonNome = this.api.apiGetPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, pokemonNome]).subscribe(
      (res) => {
        this.pokemon = res;
        this.isLoading = true;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }
}
