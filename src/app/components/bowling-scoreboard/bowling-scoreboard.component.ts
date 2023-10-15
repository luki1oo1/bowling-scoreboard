import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { IPlayer } from 'src/app/interfaces/players-interface';
import { ScoreCalculatorService } from 'src/app/services/score-calculator.service';
import { ScoreValidationService } from 'src/app/services/score-validation.service';

@Component({
  selector: 'app-bowling-scoreboard',
  templateUrl: './bowling-scoreboard.component.html',
  styleUrls: ['./bowling-scoreboard.component.scss']
})
export class BowlingScoreboardComponent {
  players: IPlayer[] = [];
  columns: number[] = Array(21).fill(0).map((x, i) => i);
  snackBarRef: MatSnackBarRef<SimpleSnackBar>;
  hasError = false;

  constructor(
    private scoreCalculatorService: ScoreCalculatorService,
    private scoreValidationService: ScoreValidationService,
    private snackBar: MatSnackBar
  ) { }

  isHTMLInputElement(target: EventTarget): target is HTMLInputElement {
    return target instanceof HTMLInputElement;
  }

  onFileSelected(event: InputEvent) {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }

    const target = event.target;

    if (!this.isHTMLInputElement(target)) {
      return;
    }

    const file: File = (target as HTMLInputElement).files[0];

    if (!file || !file.name.endsWith('.txt')) {
      this.snackBarRef = this.snackBar.open('Invalid file format! Please upload a .txt file.');
      this.hasError = true;
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      if (content) {
        this.players = [];

        const lines = content.split('\n');

        for (let i = 0; i < lines.length; i += 2) {
          const playerName = lines[i];
          const scores = lines[i + 1].split(', ').map(Number);

          const validationError = this.scoreValidationService.validatePlayerScores(playerName, scores);

          if (validationError) {
            this.snackBarRef = this.snackBar.open(validationError);
            this.hasError = true;
            return;
          }

          const player: IPlayer = {
            name: playerName,
            scores: scores
          };

          player.totalScore = this.scoreCalculatorService.calculateScore(player.scores);
          this.players.push(player);
        }
      }
    };

    this.hasError = false;
    reader.readAsText(file);
  }
}
