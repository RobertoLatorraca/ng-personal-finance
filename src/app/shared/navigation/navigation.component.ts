import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  links: any[] = [];
  showedNavSublinks: { [key: number]: boolean } = {};

  constructor(private navBarService: NavbarService) { }

  ngOnInit(): void {
    this.navBarService.getNavbarLinks().subscribe({
      next: (resp) => this.links.push(resp)
    });
  }

  showSubLinks(i: number): void {
    if(this.showedNavSublinks[i]) {
      this.showedNavSublinks[i] = false;
        return;
    }
    this.showedNavSublinks[i] = true;
  }

}
