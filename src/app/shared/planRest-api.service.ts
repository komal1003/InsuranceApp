import { Injectable } from "@angular/core";
import { HttpClient,HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { Observable,throwError } from "rxjs";
import { catchError } from "rxjs";
import { plan } from "./plan";
import { booking } from "./booking";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class PlanRestApiService
{
    private baseUrl = 'http://localhost:3000/plans';

    constructor(private http:HttpClient)
    {

    }

    httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

    //Get all insurance plans
    getAllPlans(): Observable<plan[]>
    {
        return this.http.get<plan[]>('http://localhost:3000/plans')
        .pipe(catchError(this.handleError));
    }

    //get plan by id
    getPlanById(planId: number): Observable<plan>
    {
        return this.http.get<plan>('${this.baseUrl}/plans?planId=${planId}')
        .pipe(catchError(this.handleError));
    }

    handleError(error:any)
    {
        let errorMessage = ' ';
        if(error.error instanceof ErrorEvent)
        {
            errorMessage = error.error.message;
        }
        else
        {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
        }
    }
