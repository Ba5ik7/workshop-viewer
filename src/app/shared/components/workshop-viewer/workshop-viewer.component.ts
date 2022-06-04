import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  SecurityContext,
  ViewContainerRef } from '@angular/core';
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
    private appRef: ApplicationRef,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
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
      this.loadLiveExamples('workshop-live-example', 'Test');
    });
  }

  private correctUrlPaths(data: WorkshopDocument) {
    data.html = data.html.replace(/href="#([^"]*)"/g, (_m: string, fragmentUrl: string) => {
      const absoluteUrl = `${location.pathname}#${fragmentUrl}`;
      return `href="${this.domSanitizer.sanitize(SecurityContext.URL, absoluteUrl)}"`;
    });
  }

  loadLiveExamples(componentName: string, componentClass: any) {
    const exampleElements = this.elementRef.nativeElement.querySelectorAll(`[${componentName}]`);
    [...exampleElements].forEach((element: Element) => {
      const example = element.getAttribute(componentName);
      const portalHost = new DomPortalOutlet(element, this.componentFactoryResolver, this.appRef, this.injector);
      const examplePortal = new ComponentPortal(componentClass, this.viewContainerRef);
    });
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
