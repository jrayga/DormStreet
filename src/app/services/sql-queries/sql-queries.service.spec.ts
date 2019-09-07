import { TestBed } from '@angular/core/testing';

import { SqlQueriesService } from './sql-queries.service';

describe('SqlQueriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SqlQueriesService = TestBed.get(SqlQueriesService);
    expect(service).toBeTruthy();
  });
});
