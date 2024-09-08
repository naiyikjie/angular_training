import { Component, OnDestroy, OnInit } from '@angular/core';

import { filter, map, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription!: Subscription;

  constructor() { }

  ngOnInit() {
    // Create a custom observable
    const customIntervalObservable = new Observable<number>(observer => {
      let count = 0;
      const intervalId = setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('count is greater than 3'))
        }
        count++;
      }, 1000);

      // Cleanup logic when unsubscribing
      return () => {
        clearInterval(intervalId);
      };
    })

    this.firstObsSubscription = customIntervalObservable.pipe(
      filter(data => data > 0), // Filter out values less than or equal to 0
      map((data: number) => {
        return 'Round ' + (data + 1); // Transform the data
      })
    ).subscribe(
      data => {
        console.log(data); // Log the transformed data
      },
      (error: any) => {
        console.log(error); // Log the error if any
        alert(error.message); // Alert the error message
      },
      () => {
        console.log('Completed!'); // Log when the observable completes
      }
    );

  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
