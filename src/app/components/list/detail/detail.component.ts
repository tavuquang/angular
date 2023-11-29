import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  pokemon: any = {};

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonService.getDetailPokemon(params['id']).subscribe({
        next: (val) => {
          this.pokemon = val;
          console.log(this.pokemon);
        },
        error: (err) => {
          console.log(err);
        }
      })
    });
  }

}
