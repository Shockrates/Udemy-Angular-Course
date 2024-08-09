import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {




  ingredients:Ingredient[] = [];
  private ingredientChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangedSubscription = this.shoppingListService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
    
  }

  ngOnDestroy(): void {
   this.ingredientChangedSubscription.unsubscribe();
    
  }

  onEditItem(id:number) {
    this.shoppingListService.startedEditing.next(id);
  }

  // onIngredientAdded(newIngredient: Ingredient) {
  //   this.ingredients.push(newIngredient);
  // }


}
