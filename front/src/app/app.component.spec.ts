import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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
      providers: [JokesService],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements like mat-toolbar, mat-card, etc.
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
    
    spyOn(app, 'getRandomJoke').and.callThrough();
    spyOn(app['jokesService'], 'getRandomJoke'); // Mock the service method
    
    app.ngOnInit();
    
    expect(app.getRandomJoke).toHaveBeenCalled();
    expect(app['jokesService'].getRandomJoke).toHaveBeenCalled();
  });

  it('should call jokesService.getRandomJoke when getRandomJoke is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const jokesService = TestBed.inject(JokesService);
    
    // Handle HTTP call from JokesService constructor
    const constructorReq = httpMock.expectOne('api/joke');
    constructorReq.flush(mockJoke);
    
    // Mock the service method to avoid additional HTTP calls
    spyOn(jokesService, 'getRandomJoke').and.stub();
    
    app.getRandomJoke();
    
    expect(jokesService.getRandomJoke).toHaveBeenCalled();
  });
});
