import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromShopping from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  public isCollapsed = true;

  constructor(
    private store: Store<fromShopping.AppState>
  ) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  onSaveData() {
    this.store.dispatch((new RecipeActions.StoreRecipes()));
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipe());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
