import { Component } from '@angular/core';
import { IPlayer } from 'src/app/interfeces/players-interfece';
import { ScoreCalculatorService } from 'src/app/services/score-calculator.service';
import { ScoreValidationService } from 'src/app/services/score-validation.service'; // Dodaj import

@Component({
  selector: 'app-bowling-scoreboard',
  templateUrl: './bowling-scoreboard.component.html',
  styleUrls: ['./bowling-scoreboard.component.scss']
})
export class BowlingScoreboardComponent {
  players: IPlayer[] = [];
  columns: number[] = Array(21).fill(0).map((x, i) => i);

  constructor(
    private scoreCalculatorService: ScoreCalculatorService,
    private scoreValidationService: ScoreValidationService // Dodaj serwis walidacji
  ) { }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (!file || !file.name.endsWith('.txt')) {
      alert('Invalid file format! Please upload a .txt file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const content = e.target.result.split('\n');

      this.players = [];

      for (let i = 0; i < content.length; i += 2) {
        const playerName = content[i];
        const scores = content[i + 1].split(', ').map(Number);

        const validationError = this.scoreValidationService.validatePlayerScores(playerName, scores);

        if (validationError) {
          alert(validationError);
          return;
        }

        const player: IPlayer = {
          name: playerName,
          scores: scores
        };

        player.totalScore = this.scoreCalculatorService.calculateScore(player.scores);
        this.players.push(player);
      }
    };

    reader.readAsText(file);
  }
}
