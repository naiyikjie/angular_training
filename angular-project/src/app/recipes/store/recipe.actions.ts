import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const setRecipes = createAction(
  '[Recipe] Set Recipes',
  props<{ recipes: Recipe[] }>()
);

export const fetchRecipes = createAction('[Recipe] Fetch Recipes');

export const addRecipe = createAction(
  '[Recipe] Add Recipe',
  props<{ recipe: Recipe }>()
);

export const updateRecipe = createAction(
  '[Recipe] Update Recipe',
  props<{ index: number; newRecipe: Recipe }>()
);

export const deleteRecipe = createAction(
  '[Recipe] Delete Recipe',
  props<{ number: number }>()
);

export const storeRecipe = createAction('[Recipes] Store Recipe');
