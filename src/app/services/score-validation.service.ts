import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreValidationService {
  validatePlayerScores(name: string, scores: number[]): string | null {
    // Validation of player score format
    if (!/^(?:\d+, )*\d+$/.test(scores.join(', '))) {
      return 'Incorrect result format for player ' + name + '. Please enter numbers only, separated by commas.';
    }

    // Validation of the maximum number of throws
    if (scores.length > 21) {
      return 'The maximum number of throws for a player is 21. Error with player: ' + name;
    }

    // Checking whether the sum of points in the frame does not exceed 10
    for (let i = 0; i < scores.length - 3; i += 2) {
      if (scores[i] + scores[i + 1] > 10) {
        return 'The sum of scores in one frame cannot exceed 10 for player: ' + name + '. Please check the score for throws: ' + (i + 1) + ' and ' + (i + 2);
      }
    }

    if (scores.length > 20 && scores[18] + scores[19] !== 10) {
      return 'The maximum number of throws without a bonus should be 20. Error with player: ' + name;
    }

    // Check if there are exactly 21 rolls, if the 18th and 19th rolls give a bonus
    if (scores.length < 21 && scores[18] + scores[19] === 10) {
      return 'Please enter 21 scores for player ' + name;
    }

    // Check if the results only contain numbers from 0 to 10
    if (scores.some(score => score < 0 || score > 10)) {
      return 'Incorrect score values for the player: ' + name;
    }

    return null;
  }
}
