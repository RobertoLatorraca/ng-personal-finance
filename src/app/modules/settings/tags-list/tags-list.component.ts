import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {

  isLoading: boolean = true;
  title: string = 'Tag';
  columns = [
    { field: "tag", name: "Tag", style: {} },
    { field: "parentTag", name: "Parent Tag", style: {} },
    { field: "enabled", name: "Status", style: {} }
  ];
  data: any[] = [];

  constructor(private tagService: TagService, public toastService: ToastService) { }

  ngOnInit(): void {
    this.tagService.findAll().subscribe({
      next: (resp: Tag[]) => {
        resp.forEach((tag) => {
          if (tag.enabled.toString() == "true") {
            tag.enabled = "Enabled";
          } else {
            tag.enabled = "Disabled";
          }
          (tag.parentTag === null) ? tag.parentTag = "-" : tag.parentTag = tag.parentTag.tag;
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
