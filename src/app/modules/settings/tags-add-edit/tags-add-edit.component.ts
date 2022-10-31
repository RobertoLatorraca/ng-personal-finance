import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-tags-add-edit',
  templateUrl: './tags-add-edit.component.html',
  styleUrls: ['./tags-add-edit.component.scss']
})
export class TagsAddEditComponent implements OnInit {

  isLoading: boolean = true;

  tagForm = new FormGroup({
    tag: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    parentTag: new FormControl(null),
    enabled: new FormControl('')
  });
  isEditMode: boolean = false;
  id!: string;
  tag: Tag = new Tag();

  parentTagList: Tag[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private tagService: TagService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.tagService.findAll()
      .pipe(
        map(t => t.filter(t => t.parentTag === null && t.enabled === true))
      )
      .subscribe({
        next: (resp: Tag[]) => this.parentTagList = resp,
        error: (err: any) => this.router.navigate(['../../'], { relativeTo: this.route })
      });

    if (this.id) {
      this.isEditMode = true;
      this.tagService.findById(this.id).subscribe({
        next: (resp: Tag) => {
          console.log(resp);
          this.tagForm.patchValue(resp);
          console.log(this.tagForm)
          this.tag = resp;

        },
        complete: () => this.isLoading = false,
        error: (err: any) => this.router.navigate(['../../'], { relativeTo: this.route })
      });
    } else {
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    console.log(this.tag.id);
    this.tag.tag = this.tagForm.get('tag')?.value;
    this.tag.tag = this.tag.tag.trim();
    this.tag.parentTag = this.tagForm.get('parentTag')?.value;
    this.tag.enabled = this.tagForm.get('enabled')?.value;
    if (this.isEditMode == false) {
      this.tag.enabled = true;
      this.tagService.save(this.tag).subscribe({
        complete: () => {
          this.toastService.success("New tag registered successfully!!!", { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err: any) =>
          this.toastService.error(err.error.errorText || err.message, { autoClose: false, keepAfterRouteChange: false })
      });
    } else {
      this.tagService.update(this.tag).subscribe({
        complete: () => {
          this.toastService.success("Tag edited successfully!!!", { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (err: any) =>
          this.toastService.error(err.error.errorText || err.message, { autoClose: false, keepAfterRouteChange: false })
      });
    }
  }

}
