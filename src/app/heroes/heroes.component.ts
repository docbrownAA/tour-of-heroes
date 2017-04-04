import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero/Hero';
import { HeroService } from '../hero/hero.service';

@Component({
	selector: 'my-heroes',
	templateUrl: './heroes.component.html'
	
})

export class HeroesComponent implements OnInit {
	
	heroes : Hero[];
	selectedHero: Hero;
	constructor(private heroService: HeroService) { };
	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}
	getHeroes(): void {
		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	}
	ngOnInit(): void {
		this.getHeroes();
	}

}





