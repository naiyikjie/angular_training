import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
  updateIngredient,
} from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, { ingredient }) => ({
    ...state,
    ingredients: [...state.ingredients, ingredient],
  })),
  on(addIngredients, (state, { ingredients }) => ({
    ...state,
    ingredients: [...state.ingredients, ...ingredients],
  })),
  on(updateIngredient, (state, { ingredient }) => {
    const updatedIngredients = [...state.ingredients];
    if (
      state.editedIngredientIndex >= 0 &&
      state.editedIngredientIndex < state.ingredients.length
    ) {
      updatedIngredients[state.editedIngredientIndex] = {
        ...state.ingredients[state.editedIngredientIndex],
        ...ingredient,
      };
    }
    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(deleteIngredient, (state) => ({
    ...state,
    ingredients: state.ingredients.filter((ig, igIndex) => {
      return igIndex !== state.editedIngredientIndex;
    }),
  })),
  on(startEdit, (state, { index }) => ({
    ...state,
    editedIngredientIndex: index,
    editedIngredient: { ...state.ingredients[index] },
  })),
  on(stopEdit, (state) => ({
    ...state,
    editedIngredient: null,
    editedIngredientIndex: -1,
  }))
);
