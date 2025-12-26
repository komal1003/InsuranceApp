import { Component } from '@angular/core';
import { booking } from '../shared/booking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmationpage',
  imports: [],
  templateUrl: './confirmationpage.html',
  styleUrl: './confirmationpage.css',
})
export class Confirmationpage
{
  bookingData: booking;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.bookingData = nav?.extras?.state?.['booking'];
  }

  downloadConfirmation(): void {
    // Placeholder for download functionality
    alert('Download functionality will be implemented');
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
