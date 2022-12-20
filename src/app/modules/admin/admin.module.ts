import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SidebarComponent} from "./components/sidebar/sidebar.component";

@NgModule({
  declarations: [AdminDashboardComponent, HeaderComponent, HomeComponent, CampaignComponent, SidebarComponent],
    imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
