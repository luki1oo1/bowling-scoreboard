import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreValidationService {
  validatePlayerScores(name: string, scores: number[]): string | null {
    if (!this.isValidScoreFormat(scores)) {
      return 'Incorrect result format for player ' + name + '. Please enter numbers only, separated by commas.';
    }

    if (scores.length > 21) {
      return 'The maximum number of throws for a player is 21. Error with player: ' + name;
    }

    for (let frame = 0; frame < 10; frame++) {
      if (this.isFrameScoreInvalid(scores, frame)) {
        return 'Invalid frame score for player: ' + name + ' in frame ' + (frame + 1);
      }
    }

    if (!this.isValidBonusFrame(scores)) {
      return 'The maximum number of throws without a bonus should be 20. Error with player: ' + name;
    }

    if (scores.length < 21 && this.isBonusFrame(scores)) {
      return 'Please enter 21 scores for player ' + name;
    }

    if (this.hasInvalidScores(scores)) {
      return 'Incorrect score values for the player: ' + name;
    }

    return null;
  }

  private isValidScoreFormat(scores: number[]): boolean {
    return /^(?:\d+, )*\d+$/.test(scores.join(', '));
  }

  private isFrameScoreInvalid(scores: number[], frame: number): boolean {
    const frameStart = frame * 2;
    const frameScore = scores[frameStart] + scores[frameStart + 1];
    return frameScore > 10;
  }

  private isValidBonusFrame(scores: number[]): boolean {
    return scores.length <= 20 || (scores[18] + scores[19] === 10);
  }

  private isBonusFrame(scores: number[]): boolean {
    return scores.length < 21 && scores[18] + scores[19] === 10;
  }

  private hasInvalidScores(scores: number[]): boolean {
    return scores.some(score => score < 0 || score > 10);
  }
}
