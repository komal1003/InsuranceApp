import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingRestApiService } from '../shared/bookingRest-api.service';
import { booking } from '../shared/booking';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking
{
  bookingData: booking = {
    name: '',
    city: '',
    phone: '',
    email: '',
    age: 0,
    planId: 0,
    planName: 0,
    validity: 0,
    paymentMode: '',
    cardNumber: '',
    premiumAmt: 0,
    paymentFreq: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingRestApiService
  ) {}

  ngOnInit(): void {
    const planId = Number(this.route.snapshot.queryParamMap.get('planId'));
    const planName = this.route.snapshot.queryParamMap.get('planName');
    const validity = Number(this.route.snapshot.queryParamMap.get('validity'));
    const premiumAmt = Number(this.route.snapshot.queryParamMap.get('premiumAmt'));
    const params = this.route.snapshot.queryParamMap;

    this.bookingData.planId = planId;
    this.bookingData.planName = planName as any;
    this.bookingData.validity = validity;
    this.bookingData.premiumAmt = premiumAmt;
     this.bookingData.age = Number(params.get('age'));

  if (this.bookingData.age > 50) {
  this.bookingData.premiumAmt = premiumAmt * 1.4; 
} else if (this.bookingData.age >= 30) {
  this.bookingData.premiumAmt = premiumAmt * 1.2; 
} else {
  this.bookingData.premiumAmt = premiumAmt; 
}


    this.bookingService.getAllBookings().subscribe((bookings) => {
      const maxId = bookings.reduce((max, b) => {
  const numericId = Number(b.id);
  return numericId > max ? numericId : max;
}, 0);

this.bookingData.id = maxId + 1;

    });
}

submitBooking(): void {
  this.bookingService.createBooking(this.bookingData).subscribe({
  next: (res) => {
  
    alert('Booking successful');
  },
  error: (error) => {
    alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
  }
});
 

 
    this.router.navigate(['/confirmationpage'], { state: { booking: this.bookingData } });
  };
}

