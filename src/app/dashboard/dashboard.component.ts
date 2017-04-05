import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero/Hero';
import { HeroService } from '../hero/hero.service';
import { Location } from '@angular/common';

@Component({
	selector: 'my-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	heroes: Hero[] = [];
	constructor(private heroService: HeroService,
		private location: Location) { }

	ngOnInit(): void {
		this.heroService.getHeroes()
			.then(x => this.heroes = x.slice(1, 5));
	}
	goBack(): void {
		this.location.back();
	}

}
