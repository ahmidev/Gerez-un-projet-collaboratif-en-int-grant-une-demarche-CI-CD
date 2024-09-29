import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JokesService } from './services/jokes.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from 'rxjs';
import { Joke } from './model/joke.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  let jokesService: JokesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, MatCardModule, MatDividerModule, MatToolbarModule],
      providers: [JokesService]
    }).compileComponents();

    jokesService = TestBed.inject(JokesService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call getRandomJoke on initialization', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'getRandomJoke');
    
    app.ngOnInit();
    
    expect(app.getRandomJoke).toHaveBeenCalled();
  });

  it('should call JokesService getRandomJoke when getRandomJoke is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(jokesService, 'getRandomJoke');
    
    app.getRandomJoke();
    
    expect(jokesService.getRandomJoke).toHaveBeenCalled();
  });

  it('should have joke$ as an Observable of Joke from the JokesService', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const mockJoke: Joke = { joke: 'This is a test joke', response: 'Test response' };
    
    spyOn(jokesService, 'joke$').and.returnValue(of(mockJoke));
    
    app.joke$ = jokesService.joke$();
    
    app.joke$.subscribe(joke => {
      expect(joke).toEqual(mockJoke);
    });
  });
});
