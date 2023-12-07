import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map, switchMap, take } from 'rxjs';
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
  limit: number = 20;
  offset: number = 0;

  itemsPerPage: number[] = [10, 15, 20, 25, 30];

  itemsControl = new FormControl(this.itemsPerPage[0]);
  selectedItem = this.limit;

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
            limit: this.limit,
            offset: this.offset
          },
        });
      } else {
        this.offset = parseInt(param['offset']);
        this.limit = parseInt(param['limit']);
        this.getListPokemons(param['offset'], param['limit']);
        // console.log(this.offset);
        this.router.navigate([], {
          queryParams: {
            limit: param['limit'],
            offset: param['offset']
          },
        });
      }
    });
  }

  async getListPokemons(offset: number, limit: number) {
    this.pokemonService.getPokemons(offset, limit)
      .pipe(
        map(response => {
          return response.results.map((poke: any) => {
            return this.pokemonService.getDetailPokemon(poke.name)
          });
        }),
        switchMap((getDetailRequests: Observable<any>[]) => {
          console.log(forkJoin(getDetailRequests));
          return forkJoin(getDetailRequests);
        }),
      )
      .subscribe(response => {
        // console.log(response);
        this.pokemons = ([] as any[]).concat(response);
        this.filteredPokemons = this.pokemons;
      })
  }

  onDetailClick(name: string) {
    console.log(name);
    this.router.navigate(['/list/detail', name]);
  }


  filterPokemons(filterTerm: string) {
    // console.log(filterTerm);
    if (this._searchText.trim() === '') {
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
        limit: this.limit,
        offset: this.offset
      },
    });
  }

  onPrevious() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.getListPokemons(this.offset, this.limit);
      this.router.navigate([], {
        queryParams: {
          limit: this.limit,
          offset: this.offset
        },
      });
    }
  }

  selectItem() {
    console.log(this.selectedItem);
    this.getListPokemons(this.offset, this.selectedItem);
    this.router.navigate([], {
      queryParams: {
        limit: this.selectedItem,
        offset: this.offset
      }
    })
  }
}
