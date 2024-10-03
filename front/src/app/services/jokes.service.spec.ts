import { TestBed } from '@angular/core/testing';
import { JokesService } from './jokes.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

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

});
