import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

  @Output()
  featurSelected = new EventEmitter<string>()

  private userSubscription: Subscription;
  isAuthenticated =   false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true ;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

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

  onLogout(){
    this.authService.logout();
  }
 
  
}
