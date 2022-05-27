import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'workshop-viewer-terrence-dusell',
  templateUrl: './workshop-viewer.component.html',
  styleUrls: ['./workshop-viewer.component.scss']
})
export class WorkshopViewerComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  constructor() { }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

}
