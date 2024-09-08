import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import {
  addRecipe,
  deleteRecipe,
  setRecipes,
  updateRecipe,
} from './recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [],
};

export const recipeReducer = createReducer(
  initialState,
  on(setRecipes, (state, { recipes }) => ({
    ...state,
    recipes: [...recipes],
  })),
  on(addRecipe, (state, { recipe }) => ({
    ...state,
    recipes: [...state.recipes, recipe],
  })),
  on(updateRecipe, (state, { index, newRecipe }) => {
    const updatedRecipes = [...state.recipes];
    updatedRecipes[index] = { ...state.recipes[index], ...newRecipe };

    return {
      ...state,
      recipes: updatedRecipes,
    };
  }),
  on(deleteRecipe, (state, { number }) => ({
    ...state,
    recipes: state.recipes.filter((_, index) => index !== number),
  }))
);
