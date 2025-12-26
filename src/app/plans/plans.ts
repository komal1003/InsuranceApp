import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { plan } from '../shared/plan';
import { PlanRestApiService } from '../shared/planRest-api.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-plans',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans implements OnInit
{
  age: number | null=null;
  showAgePrompt = true;
  plans: plan[] = [];
  filteredPlans: plan[] = [];
  searchId:string = '';
  selectedPlan: plan| null=null;

  constructor(private router: Router, private planService: PlanRestApiService)
  {
    
  }
  ngOnInit(): void {
    this.showAgePrompt = true;
       this.loadPlans();
  }
  submitAge(): void{
    if(this.age!=null && this.age>=30)
    {
      this.showAgePrompt = false;

    }
    else{
      alert('You must be 30 or older to proceed.');
    }
  }
  loadPlans(): void
  {
    this.planService.getAllPlans().subscribe((data)=>{
      this.plans=data;
      this.filteredPlans = data;
    })
  }

  searchPlan(): void{
    const id = parseInt(this.searchId, 10);
    if(!isNaN(id))
    {
      this.filteredPlans = this.plans.filter(p=> p.planId ===id);
    }
    else
    {
      this.filteredPlans = this.plans;
    }
  }

  // viewInfo(plan: plan): void{
  //   this.selectedPlan = plan;
  // }

  closePopup(): void
  {
    this.selectedPlan = null;
  }

  bookPlan(plan: plan): void
  {
    this.router.navigate(['/booking'], {queryParams: {  
      planId: plan.planId,
      planName: plan.planName,
      validity: plan.validity,
      premiumAmt: plan.baseAmt,
      age: this.age
     } });
  }
}
