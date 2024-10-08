import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { AuthComponent } from './auth/auth/auth.component';
// import { LoadingSpinerComponent } from './shared/loading-spiner/loading-spiner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
// import { AlertComponent } from './shared/alert/alert.component';
// import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // ShoppingListComponent,
    // ShoppingEditComponent,
    // DropdownDirective,
    // DropdownDirective,
    // RecipeStartComponent,
    // RecipeEditComponent,
    // AuthComponent,
    // LoadingSpinerComponent,
    // AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    //RecipesModule,
    //ShoppingListModule,
    //AuthModule
  ],
  providers: [ShoppingListService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
