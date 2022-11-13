import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  isLoading: boolean = true;
  title: string = 'Category';
  columns = [
    { field: "name", name: "Name", style: {} },
    { field: "parentCategory", name: "Parent Category", style: {} },
    { field: "description", name: "Description", style: {} },
    { field: "categoryGroup", name: "Group", style: {} },
    { field: "enabled", name: "Status", style: {} }
  ];
  data: any[] = [];

  constructor(private categoryService: CategoryService, public toastService: ToastService) { }
  
  ngOnInit(): void {
    this.categoryService.findAll().subscribe({
      next: (resp: Category[]) => {
        resp.forEach((category) => {
          if (category.enabled.toString() == "true") {
            category.enabled = "Enabled";
          } else {
            category.enabled = "Disabled";
          }
          (category.parentCategory === null) ? category.parentCategory = "-" : category.parentCategory = category.parentCategory.name;
        });
        this.data = resp;
      },
      complete: () => this.isLoading = false,
      error: (err: any) => {
        this.isLoading = false;
        this.toastService.error("Error in comunication with the backend.", { autoClose: false, keepAfterRouteChange: false })
      }
    });
  }

}
