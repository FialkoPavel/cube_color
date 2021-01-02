import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  color: AngularFireList<any>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  /**
   * Get All tickers from firebase
   */
  getColor(): Observable<any> {
    this.color = this.db.list('items');
    return this.color.valueChanges();
  }

}
