import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ThemePickerService {

  constructor(@Inject(DOCUMENT) private document: Document,) { }

  setStyle(key: string, href: string) {
    this._getLinkElementForKey(key).setAttribute('href', href);
  }

  removeStyle(key: string) {
    const existingLinkElement = this._getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      this.document.head.removeChild(existingLinkElement);
    }
  }

  _getLinkElementForKey(key: string) {
    return this._getExistingLinkElementByKey(key) || this._createLinkElementWithKey(key);
  }
  
  _getExistingLinkElementByKey(key: string) {
    return this.document.head.querySelector(`link[rel="stylesheet"].style-manager-${key}`);
  }
  
  _createLinkElementWithKey(key: string) {
    const linkEl = this.document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(`style-manager-${key}`);
    this.document.head.appendChild(linkEl);
    return linkEl;
  }
}
