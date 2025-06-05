import { Component, type OnInit } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Joke } from './model/joke.model';
import type { JokesService } from './services/jokes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public joke$: Observable<Joke | null> = this.jokesService.joke$();

  constructor(private jokesService: JokesService) {}

  public ngOnInit(): void {
    this.getRandomJoke();
  }

  public getRandomJoke(): void {
    this.jokesService.getRandomJoke();
  }
}
