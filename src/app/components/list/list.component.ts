import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  pokemons: any[] = [];
  _searchText: string = '';
  filteredPokemons: any[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {

  }

  get searchText() {
    return this._searchText
  }

  set searchText(value: string) {
    this._searchText = value;
    this.filteredPokemons = this.filterPokemons(value);
  }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe({
      next: (val) => {
        const newArrays: Object[] = [];
        val.results.forEach((result: any) => {
          this.pokemonService.getDetailPokemon(result.name).subscribe({
            next: (uniqVal) => {
              newArrays.push(uniqVal);
            },
            error: (err) => {
              console.log(err);
            }
          })
        })
        this.pokemons = newArrays;
        this.filteredPokemons = this.pokemons;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onDetailClick(id: string) {
    this.router.navigate(['/list', id]);
  }


  filterPokemons(filterTerm: string) {
    // console.log(filterTerm);
    if (this.pokemons.length === 0 || this._searchText.trim() === '') {
      return this.pokemons;
    } else {
      return this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(filterTerm.toLowerCase()));
    }
  }
}
