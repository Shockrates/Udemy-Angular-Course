import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  //Used for adding ingrediaents without Template Forms
  @ViewChild('nameInput', {static:true}) ingredientName: ElementRef;
  @ViewChild('amountInput', {static:true}) ingredientAmount: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('frm', {static:true}) shoppingListForm: NgForm;
  startedEditingSubscription:Subscription;
  editMode:boolean=false;
  editeditemIndex:number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.startedEditingSubscription = this.shoppingListService.startedEditing
    .subscribe(
      (index: number) => {
        this.editeditemIndex = index;
        this.editMode=true;
        this.editedItem=this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
    
  }

  ngOnDestroy(): void {
   this.startedEditingSubscription.unsubscribe();
    
  }

  onAddIngredient(form:NgForm) {
    // this.ingredientAdded.emit({
    //   name: this.ingredientName.nativeElement.value,
    //   amount: this.ingredientAmount.nativeElement.value
    // })
    const values = form.value;
    
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editeditemIndex, new Ingredient(values.name,values.amount))
    } else {
      this.shoppingListService.addIngredient(new Ingredient(values.name,values.amount))
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editeditemIndex);
    this.onClear();
  }


}
