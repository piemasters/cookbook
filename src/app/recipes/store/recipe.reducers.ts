import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromShopping from '../../store/app.reducers';
import { Nutrition } from '../../shared/nutrition.model';
import { RecipeStep } from '../recipe-step.model';

export interface FeatureState extends fromShopping.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'This is a headline',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 100,
          'https://cdn.shopify.com/s/files/1/1813/8673/products/Strip_Steak_small_345x345@2x.jpg?v=1500578212', 'g'),
        new Ingredient('French Fries', 20, 'https://www.seriouseats.com/2018/04/20180309-french-fries-vicky-wasik-15-1500x1125.jpg', 'g')
      ],
      60,
      4,
      [
        new Nutrition('Energy', 2644, 'kJ')
      ],
      [
       'Peanuts', 'Gluten', 'Milk', 'Nuts', 'Celery', 'Sesame'
     ],
      [
        new RecipeStep('These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep('These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep('These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep('These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep('These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking')      ],
      ['food', 'test'],
      5,
      4,
      3
    ),
    new Recipe(
      'Big Fat Burger',
      'This is a headline',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2, 'https://img.sndimg.com/food/image/upload/w' +
          '_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/18/30/81/pic0d8axA.jpg', 'buns'),
        new Ingredient('Meat', 100,
          'https://cdn.shopify.com/s/files/1/1813/8673/products/Strip_Steak_small_345x345@2x.jpg?v=1500578212', 'g')
      ],
      60,
      4,
      [
        new Nutrition('Energy', 2644, 'kJ')
      ],
      [
        'Peanuts', 'Gluten', 'Milk', 'Nuts', 'Celery', 'Sesame'
      ],
      [
        new RecipeStep('These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep('These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep('These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep('These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep('These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking')
      ],
      ['food', 'test'],
      5,
      4,
      3
    )
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES): {
      return {
        ...state,
        recipes: [...action.payload]
      };
    }
    case (RecipeActions.ADD_RECIPE): {
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    }
    case (RecipeActions.UPDATE_RECIPE): {
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    }
    case (RecipeActions.DELETE_RECIPE): {
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    }
    default:
      return state;
  }
}
