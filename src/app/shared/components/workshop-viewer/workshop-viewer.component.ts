import { Component, ElementRef, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { WorkshopViewerService } from './workshop-viewer.service';

@Component({
  selector: 'workshop-viewer-terrence-dusell',
  templateUrl: './workshop-viewer.component.html',
  styleUrls: ['./workshop-viewer.component.scss']
})
export class WorkshopViewerComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  textContent = '';

  constructor(
    private workshopViewerService: WorkshopViewerService,
    private elementRef: ElementRef,
    private domSanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.workshopViewerService.fetchWorkshop('/api/workshop/example-document')
    .pipe(takeUntil(this.destory))
    .subscribe((data: any) => {
      console.log('DATA', data);
      // data = data.replace(/href="#([^"]*)"/g, (_m: string, fragmentUrl: string) => {
      //   const absoluteUrl = `${location.pathname}#${fragmentUrl}`;
      //   return `href="${this.domSanitizer.sanitize(SecurityContext.URL, absoluteUrl)}"`;
      // });
      this.elementRef.nativeElement.innerHTML = data;
    });
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

}
