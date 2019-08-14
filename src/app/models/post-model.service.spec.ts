import { TestBed } from '@angular/core/testing';

import { PostModelService } from './post-model.service';

describe('PostModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostModelService = TestBed.get(PostModelService);
    expect(service).toBeTruthy();
  });
});
