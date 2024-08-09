import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {


    //@Input() recipe: Recipe;
    recipe: Recipe;
    recipeId: number
    paramsSubscription: Subscription;

    constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router:Router  ){}

    ngOnInit(): void {
        this.paramsSubscription = this.route.params.subscribe(
          (params: Params) => {
            this.recipeId = +params['id'];
            this.recipe = this.recipeService.getSelectedRecipe(this.recipeId);
          }
        );
      
    }

    ngOnDestroy(): void {
      this.paramsSubscription.unsubscribe();
       
     }

    onAddToShoppingList() {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    onEditRecipe(){
      this.router.navigate(['../',this.recipeId, 'edit'], {relativeTo:this.route})
    }

    onDeleteRecipe(){
      this.recipeService.deleteRecipe(this.recipeId);
      this.router.navigate(['/recipes']);
    }
}
