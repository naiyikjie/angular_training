import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<fromApp.AppState>);

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://ng-demo-44ccd-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return RecipesActions.setRecipes({ recipes });
      })
    )
  );

  storeRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.storeRecipe),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
          return this.http.put(
            'https://ng-demo-44ccd-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
            recipesState.recipes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(private http: HttpClient) {}
}
