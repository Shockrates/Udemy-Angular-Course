import {Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients:Ingredient[] = [
    new Ingredient('Minced meat', 5),
    new Ingredient('Tomatoest', 10),
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index:number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    //this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  
  updateIngredient(index:number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
