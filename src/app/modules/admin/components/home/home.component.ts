import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Campaign} from "../campaign/campaign.model";

var campaignList: Campaign[];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  submitted = false;
  allPoperty: any;
  formValue!: FormGroup;
  campaignModelObj: Campaign = new Campaign();

  constructor(private fb: FormBuilder) {
    this.getAllCampaigns();
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

  getAllCampaigns() {
    let item = localStorage.getItem("campaigns");
    this.allPoperty = item !== null ? JSON.parse(item) : undefined;
  }

  get f() {
    return this.formValue.controls;
  }

  updateCampaign() {
    if (this.formValue.invalid) {
      return;
    }
    this.submitted = true;

    campaignList = this.getCampaignList();
    this.campaignModelObj.id = this.formValue.value.id;
    this.campaignModelObj.title = this.formValue.value.title;
    this.campaignModelObj.description = this.formValue.value.description;
    this.campaignModelObj.point = this.formValue.value.point;
    this.campaignModelObj.date = new Date().toLocaleString();

    campaignList.forEach(campaign => {
      if (campaign.id === this.campaignModelObj.id) {
        localStorage.removeItem("campaigns");
        campaign.title = this.campaignModelObj.title;
        campaign.description = this.campaignModelObj.description;
        campaign.point = this.campaignModelObj.point;
        campaign.date = this.campaignModelObj.date;
      }
    });

    localStorage.setItem("campaigns", JSON.stringify(campaignList));
    window.location.reload();
  }

  deleteCampaign(id: any) {
    campaignList = this.getCampaignList();
    if (campaignList !== null) {
      const indexOfObject = campaignList.findIndex((pr) => {
        return pr.id == id;
      });
      if (indexOfObject !== -1) {
        campaignList.splice(indexOfObject, 1);
      }
      localStorage.setItem("campaigns", JSON.stringify(campaignList));
      alert("Silme Başarılı!");
      window.location.reload();
    }
  }

  increasePoint(id: any) {
    campaignList = this.getCampaignList();
    if (campaignList != null) {
      campaignList.find((pr) => {
        if (pr.id == id) {
          // @ts-ignore
          pr.point++;
        }
      });
      localStorage.setItem("campaigns", JSON.stringify(campaignList));
      window.location.reload();
    }
  }

  decreasePoint(id: any) {
    campaignList = this.getCampaignList();
    if (campaignList !== null) {
      campaignList.find((pr) => {
        if (pr.id == id) {
          // @ts-ignore
          pr.point--;
        }
      });
      localStorage.setItem("campaigns", JSON.stringify(campaignList));
      window.location.reload();
    }
  }

  passData(id: any) {
    // @ts-ignore
    campaignList = this.getCampaignList();
    let dataForEditing;
    if (campaignList != undefined) {
      dataForEditing = campaignList.find(cam => cam.id == id);
      if (dataForEditing != undefined) {
        this.formValue.setValue({
          id: dataForEditing.id,
          title: dataForEditing.title,
          description: dataForEditing.description,
          point: dataForEditing.point,
          date: dataForEditing.date
        });
      }
    }
  }

  private getCampaignList() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("campaigns"));
  }
}
