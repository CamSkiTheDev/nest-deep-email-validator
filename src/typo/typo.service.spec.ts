import { Test, TestingModule } from '@nestjs/testing';
import { TypoService } from './typo.service';

describe('TypoService', () => {
  let service: TypoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypoService],
    }).compile();

    service = module.get<TypoService>(TypoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
