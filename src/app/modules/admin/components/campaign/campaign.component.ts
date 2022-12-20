import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Campaign} from "./campaign.model";

var campaignList: Campaign[];

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  submitted = false;
  allPoperty: any;
  formValue!: FormGroup;
  campaignModelObj: Campaign = new Campaign();

  constructor(private fb: FormBuilder) {
    this.formValue = this.fb.group({
        id: 0,
        title: ['', Validators.required],
        description: [''],
        date: new Date().toLocaleString(),
        point: ['']
      }
    )
  }

  ngOnInit(): void {
  }


  addCampaign() {
    if (this.formValue.invalid) {
      return;
    }
    this.submitted = true;
    // @ts-ignore
    campaignList = this.getCampaignList();
    let idSequence = campaignList !== null ? Math.max(...campaignList.map(pr => pr.id)) : 0;

    this.campaignModelObj.id = idSequence + 1;
    this.campaignModelObj.title = this.formValue.value.title;
    this.campaignModelObj.description = this.formValue.value.description;
    this.campaignModelObj.point = this.formValue.value.point;
    this.campaignModelObj.date = new Date().toLocaleString();

    campaignList !== null ? campaignList.push(this.campaignModelObj) : campaignList = [this.campaignModelObj];
    localStorage.setItem("campaigns", JSON.stringify(campaignList));

    window.location.reload();
    alert("Kampanya Ekleme Başarılı");
  }

  private getCampaignList() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("campaigns"));
  }
}
