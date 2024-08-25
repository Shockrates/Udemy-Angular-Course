import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
// import { RecipesComponent } from "./recipes/recipes.component";
// import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
// import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
// import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
// import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
// import { RecipesResolverService } from "./recipes/recipes-resolver.service";
// import { recipesResolver } from "./recipes/recipes.resolver";
// import { AuthComponent } from "./auth/auth/auth.component";
// import { AuthGuard, AuthGuardFn } from "./auth/auth.guard";

const appRoutes: Routes = [
    {path:'', redirectTo:'/recipes', pathMatch: 'full'},

    // EAGER LOADING CODE
    // {path:'recipes', component:RecipesComponent, resolve:[recipesResolver],canActivate:[AuthGuardFn], children: [
    //     {path: '', component:RecipeStartComponent},
    //     {path:'new', component:RecipeEditComponent},
    //     {path:':id', component:RecipeDetailComponent, resolve:[RecipesResolverService]},
    //     {path:':id/edit', component:RecipeEditComponent, resolve:[RecipesResolverService]}
    // ]},
    // {path:'shopping-list', component:ShoppingListComponent},
    // {path:'auth', component:AuthComponent}

    //LAZY LOADING CODE
    {path:'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule)},
    {path:'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(module => module.ShoppingListModule)},
    {path:'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)}
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}