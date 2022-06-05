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
import { LiveExampleComponent } from './live-example/live-example.component';
import { WorkshopViewerService } from './workshop-viewer.service';

@Component({
  selector: 'workshop-viewer-terrence-dusell',
  templateUrl: './workshop-viewer.component.html',
  styleUrls: ['./workshop-viewer.component.scss']
})
export class WorkshopViewerComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  private static initExampleViewer(exampleViewerComponent: LiveExampleComponent,
    example: string,
    file: string | null,
    region: string | null) {
    exampleViewerComponent.example = example;
    if (file) {
      // if the html div has field `file` then it should be in compact view to show the code
      // snippet
      exampleViewerComponent.view = 'snippet';
      exampleViewerComponent.showCompactToggle = true;
      exampleViewerComponent.file = file;
      if (region) {
        // `region` should only exist when `file` exists but not vice versa
        // It is valid for embedded example snippets to show the whole file (esp short files)
        exampleViewerComponent.region = region;
      }
    } else {
      // otherwise it is an embedded demo
      exampleViewerComponent.view = 'demo';
    }

  }   

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
      this.loadLiveExamples('workshop-live-example', LiveExampleComponent);
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
      const region = element.getAttribute('region');
      const file = element.getAttribute('file');
      const portalHost = new DomPortalOutlet(element, this.componentFactoryResolver, this.appRef, this.injector);
      const examplePortal = new ComponentPortal(componentClass, this.viewContainerRef);
      const exampleViewer = portalHost.attach(examplePortal);
      const exampleViewerComponent = exampleViewer.instance as LiveExampleComponent;
      if (example !== null) {
        WorkshopViewerComponent.initExampleViewer(exampleViewerComponent, example, file, region);
      }
    });
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
