import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingSpinerComponent } from './loading-spiner/loading-spiner.component';



@NgModule({
  declarations: [
    LoadingSpinerComponent,
    AlertComponent,
    DropdownDirective,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoadingSpinerComponent,
    AlertComponent,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule { }
