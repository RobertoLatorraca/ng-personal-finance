import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-categories-add-edit',
  templateUrl: './categories-add-edit.component.html',
  styleUrls: ['./categories-add-edit.component.scss']
})
export class CategoriesAddEditComponent implements OnInit {

  isLoading: boolean = true;

  parentCategoryList: Category[] = [];
  categoryGroups: string[] = [];

  categoryForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    parentCategory: new FormControl(null),
    description: new FormControl('', Validators.required),
    categoryGroup: new FormControl('', Validators.required),
    enabled: new FormControl('')
    }
  );

  isEditMode: boolean = false;
  retrievingDataFromDb: boolean = false;
  id!: string;
  categoryObj: Category = new Category();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private toastService: ToastService) { }

  async ngOnInit(): Promise<void> {
    // Verifico si se esta agregando una nueva category o si se esta editando una existente.
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.isEditMode = true;
      this.retrievingDataFromDb = true;
    }
    // Pueblo el array de parentCategoryList. Bloqueo el hilo.
    this.parentCategoryList = await lastValueFrom(this.categoryService.findAll())
      .catch((err: any) => {
        if (this.id) {
          this.router.navigate(['../../'], { relativeTo: this.route });
        } else {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
        this.toastService.error(err.message + '. You can\'t add/edit categories at this moment. Try later.', { autoClose: false, keepAfterRouteChange: false })
        return [];
        }
      );
    // Pueblo el array de categoryGroups. Bloqueo el hilo.
    this.categoryGroups = await lastValueFrom(this.categoryService.findCategoryGroups())
      .catch((err: any) => {
        if (this.id) {
          this.router.navigate(['../../'], { relativeTo: this.route });
        } else {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
        this.toastService.error(err.message + '. You can\'t add/edit categories at this moment. Try later.', { autoClose: false, keepAfterRouteChange: false })
        return [];
        }
      );
    this.categoryForm.get('categoryGroup')?.setValue(this.categoryGroups[0]);
    if (this.id) {
      this.categoryService.findById(this.id).subscribe({
        next: (resp: Category) => {
          this.categoryForm.patchValue(resp);
          this.categoryForm.get('parentCategory')?.setValue(
            resp.parentCategory == null ? null : this.parentCategoryList.find(c => c.id == resp.parentCategory.id));
          this.categoryObj = resp;
        },
        complete: () => this.retrievingDataFromDb = false,
        error: (err: any) => this.router.navigate(['../../'], { relativeTo: this.route })
      });
    }
    this.isLoading = false;
  }

  onSubmit(): void {
    this.categoryObj.name = this.categoryForm.get('name')?.value;
    this.categoryObj.name = this.categoryObj.name.trim();
    this.categoryObj.parentCategory = this.categoryForm.get('parentCategory')?.value;
    this.categoryObj.description = this.categoryForm.get('description')?.value;
    this.categoryObj.categoryGroup = this.categoryForm.get('categoryGroup')?.value;
    this.categoryObj.enabled = this.categoryForm.get('enabled')?.value;
    if (this.isEditMode == false) {
      this.categoryObj.enabled = true;
      this.categoryService.save(this.categoryObj).subscribe({
        complete: () => {
          this.toastService.success("New category registered successfully!!!", { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err: any) =>
          this.toastService.error(err.error.errorText || err.message, { autoClose: false, keepAfterRouteChange: false })
      });
    } else {
      this.categoryService.update(this.categoryObj).subscribe({
        complete: () => {
          this.toastService.success("Category edited successfully!!!", { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (err: any) =>
          this.toastService.error(err.error.errorText || err.message, { autoClose: false, keepAfterRouteChange: false })
      });
    }
  }

}
