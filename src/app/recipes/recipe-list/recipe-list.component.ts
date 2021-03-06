import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRecipe from '../store/recipe.reducers';
import { FeatureState } from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  @Output() messageEvent = new EventEmitter<string>();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<FeatureState>) {}

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  selectRecipe() {
    this.messageEvent.emit('Recipe Selected');
  }



}
