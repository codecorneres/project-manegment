import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CallcomponentService {

   private _listners = new Subject<any>();
   private _listnersd = new Subject<any>();
    listen(): Observable<any> {
       return this._listners.asObservable();
    }
    listend(): Observable<any> {
       return this._listnersd.asObservable();
    }

    filter(filterBy: string) {
       this._listners.next(filterBy);
    }
    filterd(filterBy: string) {
       this._listnersd.next(filterBy);
    }
}
