import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexDbService {

  openDBRequest!: IDBOpenDBRequest;
  db!: IDBDatabase;
  workshopStore!: IDBObjectStore;
  examplesStore!: IDBObjectStore;

  constructor() {
    console.log('Indexed DB!');
  }

  initializeAppData(): void {
    this.openDBRequest = indexedDB.open('WorkshopDatabase', 1);
    this.openDBRequest.onerror = (error: Event) => this.openDBRequestError(error);
    this.openDBRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => this.openDBRequestVersionChanged(event);
    this.openDBRequest.onsuccess = (event: Event) => this.openDBRequestSuccess(event);
  }

  openDBRequestSuccess(event: Event): void {
    this.db = this.db ?? this.openDBRequest.result;
    const trans = this.db.transaction('workshops', 'readwrite');
    const workshopStoreTrans = trans.objectStore('workshops');

    workshopStoreTrans.put({ workshop_name: 'test-1', date: Date.now(), html: '<h1>test-1</h1>' });
    workshopStoreTrans.put({ workshop_name: 'test-2', date: Date.now(), html: '<h1>test-2</h1>' });
    workshopStoreTrans.put({ workshop_name: 'test-3', date: Date.now(), html: '<h1>test-3</h1>' });
    workshopStoreTrans.put({ workshop_name: 'test-4', date: Date.now(), html: '<h1>test-4</h1>' });
    workshopStoreTrans.put({ workshop_name: 'test-5', date: Date.now(), html: '<h1>test-5</h1>' });
    workshopStoreTrans.put({ workshop_name: 'test-6', date: Date.now(), html: '<h1>test-6</h1>' });
  }

  openDBRequestVersionChanged(event: IDBVersionChangeEvent): void {
    this.db = this.openDBRequest.result;
    this.workshopStore = this.db.createObjectStore('workshops', { keyPath: 'id', autoIncrement: true });
    this.workshopStore.createIndex('workshop_name', ['workshop_name'], { unique: true });

    this.examplesStore = this.db.createObjectStore('examples', { keyPath: 'id' });
    this.examplesStore.createIndex('workshop_name_and_examples', ['workshop_name', 'examples'], { unique: false });
  }

  openDBRequestError(error: Event): void {
    console.warn(error);
  }
}
