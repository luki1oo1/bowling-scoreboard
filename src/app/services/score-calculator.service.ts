import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreCalculatorService {

  calculateScore(scores: number[]): number {
    let score = 0;
    let frameIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      // strike
      if (scores[frameIndex] === 10) {
        score += 10 + scores[frameIndex + 2];
        frameIndex += 2;
      }
      // spare
      else if (scores[frameIndex] + scores[frameIndex + 1] === 10) {
        score += 10 + scores[frameIndex + 2];
        frameIndex += 2;
      }
      // open frame
      else {
        score += scores[frameIndex] + scores[frameIndex + 1];
        frameIndex += 2;
      }
    }
    return score;
  }
}
