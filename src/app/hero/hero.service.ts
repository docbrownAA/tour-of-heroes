import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from "./Hero";


@Injectable()
export class HeroService {
	private heroesUrl = "http://localhost:8088/heroes"; // l'url de l'api web
	private headers = new Headers();




	constructor(private http: Http) {
		this.headers.append('Content-type', 'application/json');
	}

	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
			.toPromise()
			.then(response => response.json() as Hero[])
			.catch(this.handleErrors);
	}
	getHero(id: number): Promise<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Hero)
			.catch(this.handleErrors);
	}

	update(hero: Hero): Promise<Hero> {
		const url = `${this.heroesUrl}/${hero.id}`;
		return this.http
			.put(url, JSON.stringify(hero), { headers: this.headers })
			.toPromise()
			.then(() => hero)
			.catch(this.handleErrors);
	}

	create(name: string): Promise<Hero> {
		return this.http
			.post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
			.toPromise()
			.then(res => res.json() as Hero)
			.catch(this.handleErrors);
	}

	delete(id: number): Promise<void> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http
			.delete(url, { headers: this.headers })
			.toPromise()
			.then(() => null)
			.catch(this.handleErrors);
	}

	private handleErrors(error: any): Promise<any> {
		console.error('Une erreur est survenue: ', error);
		return Promise.reject(error.message || error);
	}
}