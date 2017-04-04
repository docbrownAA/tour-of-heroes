import { Injectable } from '@angular/core';
import { Hero } from "./Hero";
import { HEROES } from "../heroes/mock-heroes";


@Injectable()
export class HeroService{
	getHeroes():Promise<Hero[]>{
		return Promise.resolve(HEROES);
	}
}