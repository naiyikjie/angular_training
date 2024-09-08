import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  private actions$ = inject(Actions);

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select('recipes'),
      take(1),
      map((recipesState) => recipesState.recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(RecipesActions.fetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.setRecipes),
            take(1),
            switchMap(() =>
              this.store.pipe(
                select('recipes'),
                map((state) => state.recipes)
              )
            )
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
