import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

//Observable class extensions
import 'rxjs/add/observable/of';

//Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { Hero } from '../hero/Hero';

@Component({
	selector: 'hero-search',
	templateUrl: './hero-search.component.html',
	styleUrls: ['./hero-search.component.css'],
	providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
	heroes: Observable<Hero[]>;
	private searchTerms = new Subject<string>();

	constructor(
		private heroesSearchService: HeroSearchService,
		private router: Router) { }

	//Push a search term into the observable stream
	search(term: string): void {
		this.searchTerms.next(term);
	}

	ngOnInit(): void {
		this.heroes = this.searchTerms
			.debounceTime(300) // attend 300ms entre chaque touche enfoncée avant de le prendre en compte
			.distinctUntilChanged() // ignore si le terme suivant est le même que le précédent
			.switchMap(term => term // échange pour le nouveau term à chaque fois qu'il change
				// return the http search observable
				? this.heroesSearchService.search(term)
				:  Observable.of<Hero[]>([])
			)
			.catch(error => {
				console.log(error);
				return Observable.of<Hero[]>([]);
			});
	}

	gotoDetail(hero: Hero): void {
		let link = ['./detail', hero.id];
		this.router.navigate(link);
	}

	diplayHeroes():void{
		this.heroes = this.searchTerms
			.debounceTime(300) // attend 300ms entre chaque touche enfoncée avant de le prendre en compte
			.distinctUntilChanged() // ignore si le terme suivant est le même que le précédent
			.switchMap(term => term // échange pour le nouveau term à chaque fois qu'il change
				// return the http search observable
				? this.heroesSearchService.search(term)
				: Observable.of<Hero[]>([])
			
			)
			.catch(error => {
				console.log(error);
				return Observable.of<Hero[]>([]);
			});
	}

}