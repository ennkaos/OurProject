import { Component, OnDestroy, OnInit } from '@angular/core';

import { Countries } from './countries';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  result!: any;
  worldWide!: any;
  errorMessage: any;
  yourCountryInfo!: Countries | null | any;
  yourIP!: any;
  results!: any;
  Countryname!: any[];
  ipLocation: any;
  filteredArray!: any[];
  countryInfo!: any;
  countryLocatedInfo!: any;
  lastUpdate!: string;
  name!: string[];
  colors: string[] = [
    'bg-warning text-white',
    'bg-success text-white',
    'bg-dark text-white',
    'bg-primary text-white',
    'bg-secondary text-white',
    'bg-danger text-white',
  ];
  iplocation!: any;
  constructor(public mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.getWorldData().subscribe((response) => {
      this.result = response[0];

      this.name = this.mainService.filterData(
        Object.getOwnPropertyNames(this.result)
      );
    });

    // collecting data from error since Observable is a bullshit IP Location

    this.mainService.getIpLocation().subscribe(
      (item) => {
        this.ipLocation = item;
        console.log(this.ipLocation.ip);
        GetAdress(this.ipLocation.ip);
      },
      (error) => {
        console.log(error);
      }
    );

    const GetAdress = (iplocation: any) => {
      this.yourIP = this.mainService
        .getDataFromIpLocation(String(iplocation))
        .subscribe((response) => {
          this.yourIP = response;
          const countryArray: any[] = [
            this.yourIP.country,
            this.yourIP.country_code,
          ];
          console.log(this.yourIP);
          //bring all the country info sorted from getCountryData call

          this.yourCountryInfo = this.mainService
            .getCountryData()
            .subscribe((response) => {
              this.countryInfo = response;

              this.countryLocatedInfo = this.mainService.sortAllData(
                countryArray,
                this.countryInfo
              )[0];
              this.Countryname = this.mainService.filterData(
                Object.getOwnPropertyNames(this.countryLocatedInfo)
              );

              return this.countryLocatedInfo;
            });

          //filter the countries [] using yourIp adress and location

          return this.yourIP;
          // filtering the Corona Aray with the Country Name
        });
    };

    //return all the Covid and the countries Data

    //collecting  data from your Ip Location
  }

  ngOnDestroy(): void {
    this.results.unsubscribe();
    this.ipLocation.unsubscribe();
  }
}
