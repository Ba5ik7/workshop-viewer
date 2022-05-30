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



import { Observable, Observer, ReplaySubject, Subject } from 'rxjs';
import { take, filter } from 'rxjs/operators';

const VERSION = 1;
interface Record {
    key: string;
    value: any;
    ttl: number;
    timestamp: number;
}
type RecordInput = Omit<Record, 'timestamp'>;
@Injectable({
    providedIn: 'root',
})
export class IndexedDbService {
    db = new ReplaySubject<IDBDatabase | null>(1);
    $db = this.db.pipe(take(1), filter(db => !!db));

    constructor() {
        const onError = (error: unknown) => {
            console.log(error);
            this.db.complete();
        };
        if (!window.indexedDB) {
            onError('IndexedDB not available');
        } else {
            const openRequest = indexedDB.open('myapp', VERSION);
            openRequest.onerror = () => onError(openRequest.error);
            openRequest.onsuccess = () => this.db.next(openRequest.result);
            openRequest.onupgradeneeded = () => {
                try {
                    const db: IDBDatabase = openRequest.result;
                    const cacheStore = db.createObjectStore('store', { keyPath: 'key' });
                    cacheStore.createIndex('value', 'value');
                    cacheStore.createIndex('timestamp', 'timestamp');
                    cacheStore.createIndex('ttl', 'ttl');
                } catch (error) {
                    onError(error);
                }
            };
        }
    }

    get(storeName: string, key: string): Observable<Record | null> {
        return Observable.create((observer: Observer<Record>) => {
            const onError = (error: unknown) => {
                console.log(error);
                observer.complete();
            };
            this.$db.subscribe(db => {
                try {
                    const txn = db.transaction([storeName], 'readonly');
                    const store = txn.objectStore(storeName);
                    const getRequest: IDBRequest<Record> = store.get(key);
                    getRequest.onerror = () => onError(getRequest.error);
                    getRequest.onsuccess = () => {
                        const record = getRequest.result;
                        if (!record ||
                            new Date(Date.now() - record.timestamp).getSeconds() > record.ttl
                        ) {
                            observer.next(null);
                        } else {
                            observer.next(getRequest.result);
                        }
                        observer.complete();
                    };
                } catch (err) {
                    onError(err);
                }
            });
        });
    }

    put(storeName: string, value: RecordInput): Observable<IDBValidKey | null> {
        return Observable.create((observer: Observer<IDBValidKey>) => {
            const onError = (error: unknown) => {
                console.log(error);
                observer.complete();
            };
            this.$db.subscribe(db => {
                try {
                    const txn = db.transaction([storeName], 'readwrite');
                    const store = txn.objectStore(storeName);
                    const record: Record = {...value, timestamp: Date.now()};
                    const putRequest = store.put(record);
                    putRequest.onerror = () => onError(putRequest.error);
                    putRequest.onsuccess = () => {
                        observer.next(putRequest.result);
                        observer.complete();
                    };
                } catch (err) {
                    onError(err);
                }
            });
        });
    }

    clear(storeName: string): any {
        return Observable.create((observer: Observer<void>) => {
            this.$db.subscribe(db => {
                try {
                    db.transaction([storeName], 'readwrite').objectStore(storeName).clear();
                } catch (error) {
                    console.log(error);
                }
                observer.complete();
            });
        });
    }
}