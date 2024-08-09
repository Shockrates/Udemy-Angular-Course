import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{

  paramsSubscription: Subscription;
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  ingredientFormGroup(ingredient?): FormGroup {
    return new FormGroup({
      'name' : new FormControl(ingredient ? ingredient.name : null, {validators: [Validators.required] }),
      'amount': new FormControl(ingredient ? ingredient.amount : null, {validators: [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] })
    })
  }

  get ingredientCtrls() {
    return  (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router){}

  ngOnInit(): void {
      this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription ='';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getSelectedRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            // new FormGroup({
            //   'name' : new FormControl(ingredient.name, {validators: [Validators.required] }),
            //   'amount': new FormControl(ingredient.amount, {validators: [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] })
            // })
            this.ingredientFormGroup(ingredient)
          );
          
        }
      }

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, {validators: [Validators.required] }),
      'description' : new FormControl(recipeDescription, {validators: [Validators.required] }),
      'imagePath': new FormControl(recipeImagePath, {validators: [Validators.required] }),
      'ingredients': recipeIngredients
    });
  }

  onSubmit(){
    
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
    )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id,newRecipe )
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
    
    
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      // new FormGroup({
      //   'name' : new FormControl(null, {validators: [Validators.required] }),
      //   'amount': new FormControl(null, {validators: [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] })
      // })
      this.ingredientFormGroup()
    )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
