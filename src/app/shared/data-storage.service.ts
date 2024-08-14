import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

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


    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     return this.http.get<Recipe[]>('https://angular-ucourse-recipe-book-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
    //       {params: new HttpParams().set('auth', user.token)}
    //     )
    //   }),
    //   map(resp => {
    //     return resp.map(recipe => {
    //       return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
    //     })
    //   }),
    //   tap(
    //     resp => {
    //       this.recipeService.setRecipes(resp)
    //     }
    //   )
    // )
    
  }

  


}
