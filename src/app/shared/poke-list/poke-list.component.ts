import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {

  public allPokemons: any;
  private allPokemonsOrig: any;

  constructor(private api: PokeApiService) {}

  ngOnInit(): void {
    this.api.apiListAllPokemons.subscribe((res) => {
      this.allPokemons = res.results;
      this.allPokemonsOrig = res.results;
      console.log(this.allPokemons);
    });
  }

  public recebendoValor(valor: string) {
    console.log('recebendo valor: ' + valor);

    const filter = this.allPokemonsOrig.filter(
      (res: any) => {
        return !res.name.indexOf(valor.toLowerCase());
        }

      );

    this.allPokemons = filter;
  }
}
