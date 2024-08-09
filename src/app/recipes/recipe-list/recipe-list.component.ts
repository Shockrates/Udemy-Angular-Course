import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit{


  // @Output() recipeComponentSelected = new EventEmitter<Recipe>();

  recipes: Recipe[];  
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.recipeSubscription = this.recipeService.recipeChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
      this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();  
  }
  
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeComponentSelected.emit(recipe);
  // }

}
