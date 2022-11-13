import { Currency } from "./currency";

export class Account {
    id!: string;
    account!: string;
    accountType!: string;
    balance: any;
    bank!: any;
    currency!: Currency;
    cbu!: string;
    accountNumber!: string;
    alias!: string;
    creditCardBrand!: string;
	creditCardNumber!: string;
	expiration!: Date;
    enabled!: any;
}
