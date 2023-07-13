import { Module } from '@nestjs/common';
import { DisposableService } from './disposable.service';

@Module({
  providers: [DisposableService],
  exports: [DisposableService],
})
export class DisposableModule {}
