import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { Nutrition } from '../../shared/nutrition.model';

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
    return <FormArray>this.recipeForm.get('allergens');
  }

  get formTags() {
    return <FormArray>this.recipeForm.get('tags');
  }

  get formSteps() {
    return <FormArray>this.recipeForm.get('steps');
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
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'unit': new FormControl(null, Validators.required),
        'imagePath': new FormControl(null)
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onAddAllergen() {
    (<FormArray>this.recipeForm.get('allergens')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteAllergen(index: number) {
    (<FormArray>this.recipeForm.get('allergens')).removeAt(index);
  }

  onAddTag() {
    (<FormArray>this.recipeForm.get('tags')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteTag(index: number) {
    (<FormArray>this.recipeForm.get('tags')).removeAt(index);
  }

  onAddStep() {
    (<FormArray>this.recipeForm.get('steps')).push(
      new FormGroup({
        'instructions': new FormControl(null, Validators.required),
        'imagePath': new FormControl(null),
        'imageCaption': new FormControl(null)
      })
    );
  }

  onDeleteStep(index: number) {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
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
    let nutrition: Nutrition = {
      'calories': null,
      'fat': null,
      'saturates': null,
      'protein': null,
      'carbs': null,
      'sugar': null,
      'salt': null,
      'fibre': null
    };

    const recipeIngredients = new FormArray([]);
    const recipeAllergens = new FormArray([]);
    const recipeTags = new FormArray([]);
    const recipeSteps = new FormArray([]);

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
          nutrition = recipe.nutrition;

          if (recipe['allergens']) {
            for (const allergen of recipe.allergens) {
              recipeAllergens.push(
                new FormGroup({
                  'name': new FormControl(allergen.name, Validators.required)
                })
              );
            }
          }

          if (recipe['tags']) {
            for (const tag of recipe.tags) {
              recipeTags.push(
                new FormGroup({
                  'name': new FormControl(tag.name, Validators.required)
                })
              );
            }
          }

          if (recipe['steps']) {
            for (const step of recipe.steps) {
              recipeSteps.push(
                new FormGroup({
                  'instructions': new FormControl(step.instructions, Validators.required),
                  'imagePath': new FormControl(step.imagePath),
                  'imageCaption': new FormControl(step.imageCaption)
                })
              );
            }
          }

          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[.\d]+$/)
                  ]),
                  'imagePath': new FormControl(ingredient.imagePath),
                  'unit': new FormControl(ingredient.unit, Validators.required),
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      'recipeEssentials': new FormGroup( {
        'name': new FormControl(recipeName, Validators.required),
        'headline': new FormControl(recipeHeadline, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'totalTime': new FormControl(totalTime, Validators.required),
        'servingSize': new FormControl(servingSize, Validators.required),
      }),
      'recipeNutrition': new FormGroup( {
        'calories': new FormControl(nutrition.calories),
        'fat': new FormControl(nutrition.fat),
        'saturates': new FormControl(nutrition.saturates),
        'protein': new FormControl(nutrition.protein),
        'carbs': new FormControl(nutrition.carbs),
        'sugar': new FormControl(nutrition.sugar),
        'salt': new FormControl(nutrition.salt),
        'fibre': new FormControl(nutrition.fibre),
      }),
      'allergens': recipeAllergens,
      'tags': recipeTags,
      'ingredients': recipeIngredients,
      'steps': recipeSteps
    });
  }

}
