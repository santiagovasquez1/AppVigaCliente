import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  validateRequest(request: any): boolean {

    for (var key in request) {
      if (request[key] === null || request[key] === undefined || request[key] === '') {
        return false;
      }
    }
    return true;
  }
}
