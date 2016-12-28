import { Injectable } from '@angular/core';

@Injectable()
export class FireBasePagerService {
  pageSize: Number;
  pageNumber: Number;
  // Put Query here

  constructor() { 
    this.pageSize = 25;
    this.pageNumber = 1;


  }

}
