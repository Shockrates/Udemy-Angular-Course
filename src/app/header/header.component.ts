import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output()
  featurSelected = new EventEmitter<string>()

  constructor(private dataStorageService: DataStorageService){}

  collapsed = true;
  onSelectFeature(feature:string) {
    this.featurSelected.emit(feature);
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes()
    .subscribe();
  }
 
  
}
