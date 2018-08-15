import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  get formIngredients() {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  get formAllergens() {
    return <FormArray>this.recipeForm.get('allegerns');
  }

  get formTags() {
    return <FormArray>this.recipeForm.get('tags');
  }

  get formSteps() {
    return <FormArray>this.recipeForm.get('steps');
  }

  get formNutrition() {
    return <FormArray>this.recipeForm.get('nutrition');
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({
        index: this.id,
        updatedRecipe: this.recipeForm.value
      }));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'headline': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeHeadline = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let totalTime = 0;
    let servingSize = 0;
    const recipeNutritionList = new FormArray([]);
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes')
        .pipe(
          take(1)
        )
        .subscribe((recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          recipeName = recipe.name;
          recipeHeadline = recipe.headline;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          servingSize = recipe.servingSize;
          totalTime = recipe.totalTime;
          if (recipe['nutrition']) {
              recipeNutritionList.push(
                new FormGroup({
                  'calories': new FormControl(recipe.nutrition.calories, Validators.required),
                  'fat': new FormControl(recipe.nutrition.fat, Validators.required),
                  'saturates': new FormControl(recipe.nutrition.saturates, Validators.required),
                  'protein': new FormControl(recipe.nutrition.protein, Validators.required),
                  'carbs': new FormControl(recipe.nutrition.carbs, Validators.required),
                  'sugar': new FormControl(recipe.nutrition.sugar, Validators.required),
                  'salt': new FormControl(recipe.nutrition.salt, Validators.required),
                  'fibre': new FormControl(recipe.nutrition.fibre, Validators.required),
              })
            );
          }
          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'headline': new FormControl(recipeHeadline, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'totalTime': new FormControl(totalTime, Validators.required),
      'servingSize': new FormControl(servingSize, Validators.required),
      'nutrition': recipeNutritionList,
      'ingredients': recipeIngredients
    });
  }

}
