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
    (async () => {
      try {
        (async () => {
          try {
            this.results = await this.mainService.getWorldData().subscribe({
              next: (response) => {
                this.result = response[0];
                console.log(this.result);
                setTimeout(() => {}, 1000);
                this.name = this.mainService.filterData(
                  Object.getOwnPropertyNames(this.result)
                );

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
                setTimeout(() => {}, 1000);
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
                    setTimeout(() => {}, 1000);
                    this.yourIP = response;
                    const countryArray: any[] = [
                      this.yourIP.country,
                      this.yourIP.country_code,
                    ];
                    console.log(this.yourIP);
                    //bring all the country info sorted from getCountryData call
                    (async () => {
                      this.yourCountryInfo = await this.mainService
                        .getCountryData()
                        .subscribe({
                          next: (response) => {
                            this.countryInfo = response;

                            this.countryLocatedInfo =
                              this.mainService.sortAllData(
                                countryArray,
                                this.countryInfo
                              )[0];
                            console.log(this.countryLocatedInfo[0]);
                            return this.countryLocatedInfo[0];
                          },
                          error: (err) => {
                            console.log(err);
                          },
                        });
                    })();

                    //filter the countries [] using yourIp adress and location

                    console.log(this.countryLocatedInfo);
                    return this.yourIP;
                    // filtering the Corona Aray with the Country Name
                  },
                  error: (err) => (this.errorMessage = err),
                });
            } catch (error) {}
          })();
        };
      } catch (error) {}
    })();
    //return all the Covid and the countries Data

    //collecting  data from your Ip Location
  }
  ngOnDestroy(): void {
    this.results.unsubscribe();
    this.ipLocation.unsubscribe();
    throw new Error('Method not implemented.');
  }
}
