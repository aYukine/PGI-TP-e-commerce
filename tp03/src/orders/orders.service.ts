import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
	createOrder(orderDto: CreateOrderDto) {
		return { status: 'Order accepted', order: orderDto };
	}
}
