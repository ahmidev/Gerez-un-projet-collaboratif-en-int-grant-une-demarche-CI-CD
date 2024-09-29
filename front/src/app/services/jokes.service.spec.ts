import { TestBed } from '@angular/core/testing';
import { JokesService } from './jokes.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Joke } from '../model/joke.model';

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

    const req = httpMock.expectOne('api/joke');
    req.flush({ joke: '', response: '' });
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getRandomJoke and update the subject', () => {
    service.getRandomJoke();

    const mockJoke: Joke = { joke: 'This is a test joke', response: 'Test response' };
    const req = httpMock.expectOne('api/joke'); 
    expect(req.request.method).toBe('GET');
    req.flush(mockJoke);

    service.joke$().subscribe(joke => {
      expect(joke).toEqual(mockJoke);
    });
  });

  it('should return an observable of Joke from joke$()', () => {
    const mockJoke: Joke = { joke: 'This is a test joke', response: 'Test response' };

    service['subject'].next(mockJoke);

    service.joke$().subscribe(joke => {
      expect(joke).toEqual(mockJoke);
    });
  });
});
