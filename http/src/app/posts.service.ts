import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.module";
import { catchError, map, Subject, tap, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content }
        this.http.post<{ name: string }>(
            'https://ng-demo-44ccd-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
            postData,
            {
                observe: 'response'
            }
        )
            .subscribe(responseData => {
                console.log(responseData);
            }, error => {
                this.error.next(error.message)
            });
    }

    fetchPosts() {
        const searchParams = new HttpParams();
        searchParams.append('print', 'pretty');
        return this.http.get<{ [key: string]: Post }>('https://ng-demo-44ccd-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
            {
                headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
                params: searchParams,
                responseType: 'json'
            }
        )
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    deletePosts() {
        return this.http.delete('https://ng-demo-44ccd-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
            {
                observe: 'events',
                responseType: 'text'
            }
        ).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Sent) {
                
            }
            if (event.type === HttpEventType.Response) {
                console.log(event.body);

            }
        }))
    }
}