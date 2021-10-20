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
  ipLocation: any;

  lastUpdate!: string;
  name!: string[];
  colors: string[] = [
    'bg-dark text-white',
    'bg-warning text-white',
    'bg-success text-white',
    'bg-secondary text-white',
    'bg-dark text-white',
    'bg-info text-white',
  ];
  iplocation!: any;
  constructor(public mainService: MainService) {}

  ngOnInit(): void {
    //return all the Covid and the countries Data
    (async () => {
      try {
        this.results = await this.mainService.getAllCountries().subscribe({
          next: (response) => {
            this.result = response.result;
            console.log(this.result);
            setTimeout(() => {}, 1000);
            this.name = Object.getOwnPropertyNames(this.result);
            console.log(this.name);
          },
          error: (err) => (this.errorMessage = err),
        });
      } catch (error) {
        console.log(
          'Retries were exhausted before a successful response was received. :-('
        );
      }
    })();
    // collecting data from error since Observable is a bullshit IP Location
    (async () => {
      try {
        this.ipLocation = await this.mainService.getIpLocation().subscribe({
          next: (item) => {
            console.log(item);
          },

          error: (error) => {
            GetAdress(
              error.error.text.substring(19, error.error.text.length - 4)
            );
          },
        });
      } catch (error) {
        console.log(error);
      }
    })();

    const GetAdress = (iplocation: any) => {
      (async () => {
        try {
          this.yourIP = this.mainService
            .getDataFromIpLocation(String(iplocation))
            .subscribe({
              next: (response) => {
                this.yourIP = response;

                return this.yourIP;
                // filtering the Corona Aray with the Country Name
              },
              error: (err) => (this.errorMessage = err),
            });
        } catch (error) {}
      })();
    };

    //collecting  data from your Ip Location
  }
  ngOnDestroy(): void {
    this.results.unsubscribe();
    this.ipLocation.unsubscribe();
    throw new Error('Method not implemented.');
  }
}
