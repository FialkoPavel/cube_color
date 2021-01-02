import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISquareElement} from "../../interfaces/squre-element";
import {AngularFirestore} from "@angular/fire/firestore";
import {Subscription} from "rxjs";

@Component({
  selector: 'square-elements',
  templateUrl: './square-elements.component.html',
  styleUrls: ['./square-elements.component.css']
})
export class SquareElementsComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription;
  public path: string = 'squares';
  public amountSquares: ISquareElement[];

  constructor(public db: AngularFirestore) { }

  async ngOnInit() {
    this._subscriptions = new Subscription();
    this.amountSquares = await this._getSquareItems(this.path) || await this._setRandomSquareColors();
  }

  private _getSquareItems(path: string): Promise<ISquareElement[]> {
    return new Promise(resolve => {
      const sub$ = this.db.collection(path)
        .valueChanges()
        .subscribe((squares: any) => {
          if (squares) this.amountSquares = squares[0]?.data;
          return resolve(squares[0]?.data);
        })
      this._subscriptions.add(sub$);
    });
  }

  private async _setRandomSquareColors(): Promise<ISquareElement[]> {
    const squares = new Array(9)
      .fill(null)
      .map((_, idx) => ({key: `s${idx}`, value: SquareElementsComponent._getRandomColor()}))
    return await this._setSquareColors(squares, this.path);
  }

  setSquareRandomColor(key: string, path: string) {
    const idx: number = this.amountSquares.findIndex(el => el.key === key);
    this.amountSquares[idx].value = SquareElementsComponent._getRandomColor();
    this._setSquareColors(this.amountSquares, path);
  }

  private async _setSquareColors(squareCollection: ISquareElement[], path: string) {
    await this.db.collection(path).doc(path).set({ data: squareCollection });
    return squareCollection;
  }

  private static _getRandomColor(): string {
    const letters: string = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
