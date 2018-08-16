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
      'Chilli Con Carne',
      'Meatballs with Sweet Peppers & Black Beans',
      'Meatballs are fantastic! Making your own is not only easy, it’s a great way of controlling\n' +
      'what you put in them, too. I’ve used paprika and chilli powder in this recipe, for a\n' +
      'lovely chilli con carne kick, but you could add all sorts of other flavours once you’ve\n' +
      'mastered this recipe – dried or fresh herbs, different spices, citrus zest, the list goes\n' +
      'on. I’ve served this with a charred chilli per person – depending how spicy you like\n' +
      'your food, feel free to chop and stir in just a little, or the whole thing if you think you\n' +
      'can handle it!',
      'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Recipes%2FChilli%20Con%20Carne%2FChilli%20Con%20Carne.png?alt=media&token=bb3872ee-808c-489e-a46b-2be8e15516b7',
      [
        new Ingredient(
          'Brown Basmati Rice',
          160,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Fbrown%20basmati%20rice.png?alt=media&token=6dc444bb-a357-45c3-bb12-bd10b10f57d4',
          'g'
        ),
        new Ingredient(
          'Spring Onion',
          2,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Fspring%20onion.png?alt=media&token=4931174f-a721-4511-bd2a-14893aae9019',
          'spring onion/s'
        ),
        new Ingredient(
          'Red Pepper',
          1,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Fred%20pepper.png?alt=media&token=50986e98-809e-4f2c-b3a1-66caacc3d08b',
          'red pepper/s'
        ),
        new Ingredient(
          'Fresh Coriander',
          3,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Ffresh%20coriander.png?alt=media&token=16157dc7-2369-4952-b620-9ffd7bfcd4a0',
          'sprigs'
        ),
        new Ingredient(
          'Sweet Smoked Paprika',
          0.5,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Fsweet%20smoked%20paprika.png?alt=media&token=4325da47-c28e-446d-b338-71bf0c0f8224',
          'teaspoon/s'
        ),
        new Ingredient(
          'Chilli Powder',
          0.25,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Fchilli%20powder.png?alt=media&token=11d60852-bb68-470f-8481-02fc0eb85c80',
          'teaspoon/s'
        ),
        new Ingredient(
          'Plum Tomatoes',
          400,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Fplum%20tomatoes.png?alt=media&token=3dd7af0b-cae5-44a3-af2b-905b472bacc0',
          'g'
        ),
        new Ingredient(
          'Black Beans',
          400,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Fblack%20beans.png?alt=media&token=62e6432c-4311-46fd-8347-6cbd06a4b522',
          'g'
        ),
        new Ingredient(
          'Green Chilli',
          2,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Fgreen%20chilli.png?alt=media&token=6efb24d0-c622-41dd-ac30-566312742030',
          'chilli/s'
        ),
        new Ingredient(
          'Cumin Seeds',
          0.5,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Fcumin%20seeds.png?alt=media&token=eda08310-9d93-4574-a03b-54e68fbda9b4',
          'teaspoon/s'
        ),
        new Ingredient(
          'Natural Yoghurt',
          2,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Fnatural%20yogurt.png?alt=media&token=12f697c0-5948-4c0e-8815-ebc3ff4076a9',
          'tablespoon/s'
        ),
        new Ingredient(
          'Lime',
          1,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Flime.png?alt=media&token=4810a384-c109-44f6-9ea2-6c5d9eb79bd3',
          'lime/s'
        ),
        new Ingredient(
          'Lean Minced Beef',
          200,
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Ingredients%2Flean%20minced%20beef.png?alt=media&token=76b04b52-a420-40e3-9186-ab380dbc8a06',
          'g'
        )
      ],
      40,
      2,
      new Nutrition(654.2, 16.8, 4.6, 39.4, 86.8, 12.3, 1, 17.2),
      [
       'Milk'
     ],
      [
        new RecipeStep(
          1,
          'Cook the rice in a pan of boiling salted water over a medium heat for ' +
          '25minutes, or until tender, then drain well. Tip back into the pan, season ' +
          'with black pepper, cover with a lid and keep to one side.',
          'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg',
          'cooking'
        ),
        new RecipeStep(
          2,
          'Meanwhile, trim and finely slice the spring onions, then halve, deseed ' +
          'and roughly chop the pepper. Pick the coriander, finely chopping the leaves and stalks.',
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Recipes%2FChilli%20Con%20Carne%2FStep%202.png?alt=media&token=c6352ff0-1152-4d9b-a32b-d6712325ef33',
          'slice the spring onions'
        ),
        new RecipeStep(
          3,
          'Heat 1tablespoon of oil in a wide saucepan over a medium heat, add ' +
          'the sliced spring onion, pepper and coriander stalks and fry for 4 to ' +
          '5 minutes, until softened, stirring occasionally.',
          '',
          ''
        ),
        new RecipeStep(
          4,
          'Meanwhile, place the beef into a mixing bowl, add the sweet smoked ' +
          'paprika, chilli powder (add a little less if you can’t handle the heat!) and ' +
          'a good pinch of sea salt and black pepper and mix together well. Using ' +
          'wet hands, roll the mixture into 6little balls.',
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Recipes%2FChilli%20Con%20Carne%2FStep%204.png?alt=media&token=5776ad44-0717-423c-807a-cf437971d9b3',
          'roll the mixture into 6little balls'
        ),
        new RecipeStep(
          5,
          'Add the tomatoes to the saucepan along with ½a tin’s worth of water, ' +
          'breaking the tomatoes up with a spoon as you go. Bring to the boil then drain and add the black beans.',
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Recipes%2FChilli%20Con%20Carne%2FStep%205.png?alt=media&token=2d8ef211-a17c-481d-8a6d-1bcacc21f9a9',
          'add the tomatoes to the saucepan'
        ),
        new RecipeStep(
          6,
          'Preheat the grill to high. Prick the chillies and place on a baking tray under the hot grill for ' +
          '10minutes, or until blackened, turning often.',
          'https://firebasestorage.googleapis.com/v0/b/cookbook-eda8c.appspot.com/o/Recipes%2FChilli%20Con%20Carne%2FStep%206.png?alt=media&token=20b2e281-2333-4e0e-8b27-26175f441a32',
          'place chillies on a baking tray'
        ),
        new RecipeStep(
          7,
          'Meanwhile, heat ½a tablespoon of oil in a frying pan over a medium ' +
          'heat, add the meatballs and cumin seeds, then fry for 4minutes, or until ' +
          'browned all over, stirring often.',
          '',
          ''
        ),
        new RecipeStep(
          8,
          'Add the meatballs to the tomato sauce and cook for 6to 8minutes, ' +
          'or until the sauce is thick and the meatballs are cooked through, stirring occasionally.',
          '',
          ''
        ),
        new RecipeStep(
          9,
          'Fold the chopped coriander leaves through the rice, then divide ' +
          'between your plates. Top each with the meatballs and beans, ' +
          '1blackened chilli, 1tablespoon of yoghurt, and 1wedge of lime for squeezing over.',
          '',
          ''
        )
      ],
      ['food', 'test'],
      3,
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
      new Nutrition(654.2, 16.8, 4.6, 39.4, 86.8, 12.3, 1, 17.2),
      [
        'Peanuts', 'Gluten', 'Milk', 'Nuts', 'Celery', 'Sesame'
      ],
      [
        new RecipeStep(1, 'These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep(2, 'These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep(3, 'These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep(4, 'These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking'),
        new RecipeStep(5, 'These are the instructions', 'http://ogradacustruti.ro/nou/wp-content/uploads/2018/04/cooking-tips.jpg', 'cooking')
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
