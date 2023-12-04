import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  limit = 20;
  offset: number = 0;

  constructor(private pokemonService: PokemonService, private router: Router,
    private route: ActivatedRoute) {

  }

  get searchText() {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
    this.filteredPokemons = this.filterPokemons(value);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      // console.log(param);
      if (!param['offset']) {
        this.getListPokemons(this.offset, this.limit);
        this.router.navigate([], {
          queryParams: {
            offset: 0,
            limit: param['limit']
          },
        });
      } else {
        this.offset = parseInt(param['offset']);
        this.getListPokemons(param['offset'], param['limit']);
        // console.log(param['offset']);
        this.router.navigate([], {
          queryParams: {
            offset: param['offset'],
            limit: param['limit']
          },
        });
      }
    });
  }

  getListPokemons(offset: number, limit: number) {
    this.pokemonService.getPokemons(offset, limit).subscribe({
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
    this.router.navigate(['/list/detail', id]);
  }


  filterPokemons(filterTerm: string) {
    // console.log(filterTerm);
    if (this.pokemons.length === 0 || this._searchText.trim() === '') {
      return this.pokemons;
    } else {
      return this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(filterTerm.toLowerCase()));
    }
  }

  onNext() {
    // console.log(this.offset);
    this.offset += this.limit;
    this.getListPokemons(this.offset, this.limit);
    this.router.navigate([], {
      queryParams: {
        offset: this.offset,
        limit: this.limit
      },
    });
  }

  onPrevious() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.getListPokemons(this.offset, this.limit);
      this.router.navigate([], {
        queryParams: {
          offset: this.offset,
          limit: this.limit
        },
      });
    }
  }
}
