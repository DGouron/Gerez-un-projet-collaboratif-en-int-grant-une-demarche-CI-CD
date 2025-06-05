import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JokesService } from './jokes.service';
import type { Joke } from '../model/joke.model';

describe('JokesService', () => {
  let service: JokesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokesService]
    });
    service = TestBed.inject(JokesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call API on construction', () => {
    const mockJoke: Joke = {
      joke: 'Why did the chicken cross the road?',
      response: 'To get to the other side!'
    };

    const req = httpMock.expectOne('api/joke');
    expect(req.request.method).toBe('GET');
    req.flush(mockJoke);
  });

  it('should get random joke and update subject', () => {
    const mockJoke: Joke = {
      joke: 'What do you call a fake noodle?',
      response: 'An impasta!'
    };

    // Skip initial HTTP call from constructor
    const initialReq = httpMock.expectOne('api/joke');
    initialReq.flush(mockJoke);

    // Test getRandomJoke method
    service.getRandomJoke();

    const req = httpMock.expectOne('api/joke');
    expect(req.request.method).toBe('GET');
    req.flush(mockJoke);

    service.joke$().subscribe(joke => {
      expect(joke).toEqual(mockJoke);
    });
  });

  it('should return observable of jokes', () => {
    const mockJoke: Joke = {
      joke: 'Why don\'t scientists trust atoms?',
      response: 'Because they make up everything!'
    };

    // Handle constructor HTTP call
    const req = httpMock.expectOne('api/joke');
    req.flush(mockJoke);

    const observable = service.joke$();
    expect(observable).toBeDefined();

    observable.subscribe(joke => {
      expect(joke).toEqual(mockJoke);
    });
  });
});
