import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { JokesService } from './services/jokes.service';
import type { Joke } from './model/joke.model';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;
  const mockJoke: Joke = {
    joke: 'Why do programmers prefer dark mode?',
    response: 'Because light attracts bugs!'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [JokesService]
    }).compileComponents();
    
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // Handle HTTP call from JokesService constructor
    const req = httpMock.expectOne('api/joke');
    req.flush(mockJoke);
    
    expect(app).toBeTruthy();
  });

  it('should initialize joke observable', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // Handle HTTP call from JokesService constructor
    const req = httpMock.expectOne('api/joke');
    req.flush(mockJoke);
    
    expect(app.joke$).toBeDefined();
  });

  it('should call getRandomJoke on ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // Handle HTTP call from JokesService constructor
    const constructorReq = httpMock.expectOne('api/joke');
    constructorReq.flush(mockJoke);
    
    spyOn(app, 'getRandomJoke');
    
    app.ngOnInit();
    
    expect(app.getRandomJoke).toHaveBeenCalled();
  });

  it('should call jokesService.getRandomJoke when getRandomJoke is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const jokesService = TestBed.inject(JokesService);
    
    // Handle HTTP call from JokesService constructor
    const constructorReq = httpMock.expectOne('api/joke');
    constructorReq.flush(mockJoke);
    
    spyOn(jokesService, 'getRandomJoke');
    
    app.getRandomJoke();
    
    expect(jokesService.getRandomJoke).toHaveBeenCalled();
  });
});
