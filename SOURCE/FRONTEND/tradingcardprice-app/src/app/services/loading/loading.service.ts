import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  /** Check if loading */
  isLoading = new BehaviorSubject(false);

  /** Constructor */
  constructor() {}
}
