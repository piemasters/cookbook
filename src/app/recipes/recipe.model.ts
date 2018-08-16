import { Ingredient } from '../shared/ingredient.model';
import { RecipeStep } from './recipe-step.model';
import { Nutrition } from '../shared/nutrition.model';
import { Allergen } from '../shared/allergen.model';
import { Tag } from '../shared/tag.model';

export class Recipe {
  public name: string;
  public headline: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public totalTime: number;
  public servingSize: number;
  public nutrition: Nutrition;
  public allergens: Allergen[];
  public steps: RecipeStep[];
  public tags: Tag[];
  public averageRating: number;
  public ratingsCount: number;
  public favoritesCount: number;

  constructor(name: string, headline: string, desc: string, imagePath: string, ingredients: Ingredient[], totalTime: number,
              servingSize: number, nutrition: Nutrition, allergens: Allergen[], steps: RecipeStep[], tags: Tag[],
              averageRating: number, ratingsCount: number, favoritesCount: number) {
    this.name = name;
    this.headline = headline;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.totalTime = totalTime;
    this.servingSize = servingSize;
    this.nutrition = nutrition;
    this.allergens = allergens;
    this.steps = steps;
    this.tags = tags;
    this.averageRating = averageRating;
    this.ratingsCount = ratingsCount;
    this.favoritesCount = favoritesCount;
  }
}
