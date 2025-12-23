import { Injectable } from "@angular/core";
import { HttpClient,  HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs";
import { booking } from "./booking";
import { plan } from "./plan";

@Injectable(
    {
        providedIn: 'root'
    }
)

export class BookingRestApiService
{
    apiUrl = 'http://localhost:3000/bookings';

    constructor(private http: HttpClient)
    {

    }

    httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type':'application/json'
            }
        )
    };

    handleError(error: HttpErrorResponse) {
  let errorMessage = '';
 
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Client Error: ${error.error.message}`;
  } else {
    // Server-side error
    errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
  }
 
  return throwError(() => errorMessage);
}
 
    //Create a new booking
    createBooking(bookingData: booking): Observable<booking>
    {
        return this.http.post<booking>('http://localhost:3000/bookings', bookingData, this.httpOptions)
        .pipe(catchError(this.handleError));
    }

    //Get all bookings
    getAllBookings(): Observable<booking[]>
    {
        return this.http.get<booking[]>('http://localhost:3000/bookings')
        .pipe(catchError(this.handleError));
    }
}