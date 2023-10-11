import { Component } from '@angular/core';
import { IPlayer } from 'src/app/interfeces/players-interfece';
import { ScoreCalculatorService } from 'src/app/services/score-calculator.service';

@Component({
  selector: 'app-bowling-scoreboard',
  templateUrl: './bowling-scoreboard.component.html',
  styleUrls: ['./bowling-scoreboard.component.scss']
})
export class BowlingScoreboardComponent {
  players: IPlayer[] = [];
  columns: number[] = Array(21).fill(0).map((x, i) => i);

  constructor(private scoreCalculatorService: ScoreCalculatorService) { }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const content = e.target.result.split('\n');
        this.players = [];

        for(let i = 0; i < content.length; i+=2) {
          const player: IPlayer = {
            name: content[i],
            scores: content[i + 1].split(', ').map(Number)
          };
          player.totalScore = this.scoreCalculatorService.calculateScore(player.scores);
          this.players.push(player);
        }
      };

      reader.readAsText(file);
    }
  }
}
