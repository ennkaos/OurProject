import { Component, OnDestroy, OnInit } from '@angular/core';
import { Countries } from './countries';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  result!: Countries[];
  worldWide!: any;
  errorMessage: any;
  yourCountryInfo!: Countries | null | any;
  yourIP!: any;
  results!: any;
  ipLocation: any;

  lastUpdate!: string;
  name!: string[];
  colors: string[] = [
    'bg-primary text-white',
    'bg-warning text-white',
    'bg-danger text-white',
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
            console.log(response);
            this.result = response;
            setTimeout(() => {}, 1000);
            this.worldWide = response[0];
            this.lastUpdate = this.worldWide['Last Update'];
            this.name = Object.getOwnPropertyNames(this.worldWide);
            this.name = this.name.filter((item) => {
              return item !== 'Country_text' && item !== 'Last Update'
                ? item
                : null;
            });
            this.worldWide = this.mainService.sortingData(
              this.name,
              this.worldWide
            );
          },
          error: (err) => (this.errorMessage = err),
        });
      } catch (error) {
        console.log(
          'Retries were exhausted before a successful response was received. :-('
        );
      }
    })();
    //collecting data from error since Observable is a bullshit IP Location
    (async () => {
      try {
        this.ipLocation = await this.mainService.getIpLocation().subscribe({
          next: (item) => {
            setTimeout(() => {
              console.log(item);
            }, 2000);
          },

          error: (error) => {
            GetAdress(error.error.text);
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
                this.yourCountryInfo = GetCountryData();

                return this.yourIP;
                // filtering the Corona Aray with the Country Name
              },
              error: (err) => (this.errorMessage = err),
            });
        } catch (error) {}
      })();
    };
    const GetCountryData = () => {
      async () => {
        try {
          const result = this.mainService.getYourCountryData(
            this.yourIP.country_code,
            this.yourIP.country,
            this.result,
            this.yourCountryInfo
          );

          return result;
        } catch (error) {
          console.log(error);
          return error;
        }
      };
    };
    //collecting  data from your Ip Location
  }
  ngOnDestroy(): void {
    this.results.unsubscribe();
    this.ipLocation.unsubscribe();
    throw new Error('Method not implemented.');
  }
}
