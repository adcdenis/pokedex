import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  constructor(private api: PokeApiService) { }

  ngOnInit(): void {
    this.api.apiListAllPokemons.subscribe(
      res => console.log(res)
    )
  }

}
