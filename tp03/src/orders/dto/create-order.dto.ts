import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
	@IsString()
	name: string;

	@IsNumber()
	@Min(0)
	price: number;
}
