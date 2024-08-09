import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const dataStorageService = inject(DataStorageService)
  const recipeService = inject(RecipeService)

  const recipes = recipeService.getRecipes();
        if (recipes.length >0) {
          console.log(true);
          
          return recipes;
        } else {
          console.log(false);
          
            return [];
        }
};
