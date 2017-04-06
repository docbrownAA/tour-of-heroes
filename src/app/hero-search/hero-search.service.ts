import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from '../hero/Hero';


@Injectable()
export class HeroSearchService {
	private heroesUrl = "localhost:8088/heroes";
  constructor(private http: Http) { }
  search(term:string):Observable<Hero[]>{
	  return this.http
		  .get(`${this.heroesUrl}/?name=${term}`)
		  .map(response => response.json().data as Hero[]);
  }
}
