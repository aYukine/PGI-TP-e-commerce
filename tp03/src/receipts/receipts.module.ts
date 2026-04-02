import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/database/entities/receipts.entity'
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module ({
    imports: [TypeOrmModule.forFeature([Receipt]), NotificationsModule],
    controllers: [ReceiptsController],
    providers: [ReceiptsService],
    exports: []
})
export class ReceiptModule{}