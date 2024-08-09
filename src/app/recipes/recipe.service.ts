import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  //recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  // private recipes:Recipe[] = [
  //   new Recipe(
  //     'A test Recipe', 
  //     'This is a siple test', 
  //     'https://images.pexels.com/photos/20205482/pexels-photo-20205482/free-photo-of-a-burger-on-a-plate.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     [
  //       new Ingredient('Minced Meat', 1),
  //       new Ingredient('Pottatoes', 6),
  //     ]
  //   ),
  //   new Recipe(
  //     'A second test Recipe', 
  //     'This is a siple test', 
  //     'https://images.pexels.com/photos/20205482/pexels-photo-20205482/free-photo-of-a-burger-on-a-plate.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Minced Meat', 1),
  //     ])

  // ];
  private recipes:Recipe[] = []
  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getSelectedRecipe(id: number): Recipe{
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
