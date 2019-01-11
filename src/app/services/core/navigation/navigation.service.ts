import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  isVisible: boolean = true;
  constructor() { }

  hide() { this.isVisible = false; }
  show() { this.isVisible = true; }

}
