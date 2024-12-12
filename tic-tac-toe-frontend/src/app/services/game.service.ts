import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:5000/api/game';
  constructor() { }
  makeMove(row: number, col: number) {
    return axios.post(`${this.apiUrl}/move`, { row, col });
  }

  resetGame() {
    return axios.post(`${this.apiUrl}/reset`);
  }
}
