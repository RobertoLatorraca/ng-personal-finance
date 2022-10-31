import { Currency } from "./currency";

export class Balance {
    id!: string;
	balance!: number;
	currency!: Currency;
	balanceAt!: Date;
}
