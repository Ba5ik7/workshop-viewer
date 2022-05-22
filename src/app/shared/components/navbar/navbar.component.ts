import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '../../interfaces/section.interface';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  sections$!: Observable<{ [key: string]: Section }>;

  constructor(navigationService: NavigationService) {
    this.sections$ = navigationService.sections$;
  }

}
