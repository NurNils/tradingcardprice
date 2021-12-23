import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Constructor */
  constructor(private apiService: ApiService) {}

  /** Login */
  async login(usernameOrEmail: string, password: string) {
    return await this.apiService.post('login', {
      usernameOrEmail,
      password,
    });
  }

  /** Register */
  async register(email: string, username: string, password: string) {
    return await this.apiService.post('register', {
      email,
      username,
      password,
    });
  }

  /** Logout */
  async logout() {
    return await this.apiService.get('logout');
  }
}
