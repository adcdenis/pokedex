import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, shareReplay, switchMap, timer } from 'rxjs';
import type { Pokemon, PokemonListResponse, PokemonListItem, PokemonSpecies } from '../models/pokemon.interface';

const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hora

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  private readonly listUrl = `${this.baseUrl}/pokemon/?offset=0&limit=1025`;

  private pokemonListCache$: Observable<PokemonListItem[]> | null = null;
  private pokemonDetailCache = new Map<string, Observable<Pokemon>>();
  private speciesDetailCache = new Map<number, Observable<PokemonSpecies>>();

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<PokemonListItem[]> {
    if (!this.pokemonListCache$) {
      this.pokemonListCache$ = this.http.get<PokemonListResponse>(this.listUrl).pipe(
        switchMap((response) => {
          const detailRequests = response.results.map((item) =>
            this.getPokemonByUrl(item.url)
          );
          return forkJoin(detailRequests).pipe(
            map((pokemons) =>
              response.results.map((item, index) => ({
                ...item,
                status: pokemons[index],
              }))
            )
          );
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
        this.cacheWithExpiry(60 * 60 * 1000, () => {
          this.pokemonListCache$ = null;
        })
      );
    }
    return this.pokemonListCache$;
  }

  getPokemonByUrl(url: string): Observable<Pokemon> {
    if (!this.pokemonDetailCache.has(url)) {
      this.pokemonDetailCache.set(
        url,
        this.http.get<Pokemon>(url).pipe(shareReplay({ bufferSize: 1, refCount: true }))
      );
    }
    return this.pokemonDetailCache.get(url)!;
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.baseUrl}/pokemon/${id}`;
    return this.getPokemonByUrl(url);
  }

  getPokemonSpecies(id: number): Observable<PokemonSpecies> {
    if (!this.speciesDetailCache.has(id)) {
      this.speciesDetailCache.set(
        id,
        this.http
          .get<PokemonSpecies>(`${this.baseUrl}/pokemon-species/${id}`)
          .pipe(shareReplay({ bufferSize: 1, refCount: true }))
      );
    }
    return this.speciesDetailCache.get(id)!;
  }

  getPokemonDetails(id: number): Observable<[Pokemon, PokemonSpecies]> {
    return forkJoin([this.getPokemonById(id), this.getPokemonSpecies(id)]);
  }

  clearCache(): void {
    this.pokemonListCache$ = null;
    this.pokemonDetailCache.clear();
    this.speciesDetailCache.clear();
  }

  private cacheWithExpiry<T>(durationMs: number, onExpire: () => void) {
    return (source: Observable<T>): Observable<T> => {
      const expiry$ = timer(durationMs);
      let expired = false;

      expiry$.subscribe(() => {
        expired = true;
        onExpire();
      });

      return source.pipe(
        map((data) => {
          if (expired) {
            onExpire();
          }
          return data;
        })
      );
    };
  }
}
