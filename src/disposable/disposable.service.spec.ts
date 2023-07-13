import { Test, TestingModule } from '@nestjs/testing';
import { DisposableService } from './disposable.service';

describe('DisposableService', () => {
  let service: DisposableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisposableService],
    }).compile();

    service = module.get<DisposableService>(DisposableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
