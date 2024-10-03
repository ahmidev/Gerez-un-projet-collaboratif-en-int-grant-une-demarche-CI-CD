import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JokesService } from './services/jokes.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
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

});
