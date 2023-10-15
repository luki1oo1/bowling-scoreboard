import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BowlingScoreboardComponent } from './components/bowling-scoreboard/bowling-scoreboard.component';
import { PATHS } from './app-routing-paths';

const routes: Routes = [
    { path: PATHS.Home, component: BowlingScoreboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
