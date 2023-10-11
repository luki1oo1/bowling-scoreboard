import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BowlingScoreboardComponent } from './components/bowling-scoreboard/bowling-scoreboard.component';

const routes: Routes = [
    { path: '', component: BowlingScoreboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
