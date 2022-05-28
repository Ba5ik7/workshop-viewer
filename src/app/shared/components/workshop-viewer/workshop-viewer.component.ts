import { Component, ElementRef, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { WorkshopDocument } from '../../interfaces/workshop-document.interface';
import { WorkshopViewerService } from './workshop-viewer.service';

@Component({
  selector: 'workshop-viewer-terrence-dusell',
  templateUrl: './workshop-viewer.component.html',
  styleUrls: ['./workshop-viewer.component.scss']
})
export class WorkshopViewerComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  constructor(
    private workshopViewerService: WorkshopViewerService,
    private elementRef: ElementRef,
    private domSanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.workshopViewerService.fetchWorkshop('/api/workshop/example-document')
    .pipe(takeUntil(this.destory))
    .subscribe((data) => {
      this.correctUrlPaths(data);
      this.elementRef.nativeElement.innerHTML = data.html;
    });
  }

  private correctUrlPaths(data: WorkshopDocument) {
    data.html = data.html.replace(/href="#([^"]*)"/g, (_m: string, fragmentUrl: string) => {
      const absoluteUrl = `${location.pathname}#${fragmentUrl}`;
      return `href="${this.domSanitizer.sanitize(SecurityContext.URL, absoluteUrl)}"`;
    });
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
