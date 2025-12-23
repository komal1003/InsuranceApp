import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Plans } from './plans/plans';
import { Booking } from './booking/booking';
import { AboutUs } from './about-us/about-us';
import { Confirmationpage } from './confirmationpage/confirmationpage';

export const routes: Routes = [
    {
        path:'' , redirectTo:'/home', pathMatch:'full'
    },
    {
        path:'home' , component:Home
    },
    {
        path:'plans' , component:Plans
    },
    {
        path:'booking', component:Booking
    },
    {
        path:'about-us', component:AboutUs
    },
    {
        path:'confirmationpage', component:Confirmationpage
    }
];
