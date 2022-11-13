import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input()
  account!: Account;

  constructor() { }

  ngOnInit(): void {
    console.log(this.account);
  }

}
