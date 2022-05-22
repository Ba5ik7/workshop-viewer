import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss']
})
export class WorkshopDetailComponent implements OnInit {

  constructor(activatedRoute: ActivatedRoute) {
    combineLatest([
      activatedRoute.params,
    ]).subscribe((data) => console.log(data))
  }

  ngOnInit(): void {
  }

}
