import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://angular-ucourse-recipe-book-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    )
    .subscribe(resp => {
      console.log(resp);
    });
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://angular-ucourse-recipe-book-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .pipe(
      map(resp => {
        return resp.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        })
      }),
      tap(
        resp => {
          this.recipeService.setRecipes(resp)
          
        }
      )
    )
    
  }

  


}
