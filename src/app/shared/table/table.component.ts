import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() 
  title: string = '<<title here>>';
  
  @Input()
  columns!: { field: string, name: string, style: { [klass: string]: any; } }[];

  @Input()
  data: any[] = [];

  @Input()
  addButton: boolean = true;

  @Input()
  addButtonUrl: string = "/";

  @Input()
  editButton: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
