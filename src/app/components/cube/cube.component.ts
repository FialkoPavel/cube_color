import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISquareElement} from "../../interfaces/squre-element";
import {Subscription} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {ResourceService} from "../../services/resource.service";

@Component({
  selector: 'cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css'],
})
export class CubeComponent implements OnInit, OnDestroy {

  fakeSide(color: string) {
    return [
      { key: 's0', value: color },
      { key: 's1', value: color },
      { key: 's2', value: color },
      { key: 's3', value: color },
      { key: 's4', value: color },
      { key: 's5', value: color },
      { key: 's6', value: color },
      { key: 's7', value: color },
      { key: 's8', value: color },
    ]
  }

  fakeData = Object.entries({
    front: this.fakeSide('#E74C3C'),
    back: this.fakeSide('#48C9B0'),
    top: this.fakeSide('#F1C40F'),
    bottom: this.fakeSide('#34495E'),
    left: this.fakeSide('#7D3C98'),
    right: this.fakeSide('#979A9A')
  })

  private _subscriptions: Subscription;
  public path: string = 'squares';
  public amountSquares: ISquareElement[];

  constructor(public db: AngularFirestore, public resourceService: ResourceService) {}

  async ngOnInit() {
    this._subscriptions = new Subscription();
    this.amountSquares = await this._getSquareItems(this.path) || await this._setRandomSquareColors();
  }

  private _getSquareItems(path: string): any {
   const sub$ = this.resourceService
      .getData(path)
      .subscribe((squares: any) => {
        if (squares) this.amountSquares = squares[0]?.data;
        return squares[0]?.data;
    })
    this._subscriptions.add(sub$);
  }

  private _setRandomSquareColors(): ISquareElement[] {
    const squares = new Array(9)
      .fill(null)
      .map((_, idx) => ({key: `s${idx}`, value: this.getRandomColor()}))
    console.log('squares', squares)
    return this._setSquareColors(squares, this.path);
  }

  setSquareRandomColor(key: string, path: string) {
    const idx: number = this.amountSquares.findIndex(el => el.key === key);
    this.amountSquares[idx].value = this.getRandomColor();
    this._setSquareColors(this.amountSquares, path);
  }

  private _setSquareColors(squareCollection: ISquareElement[], path: string) {
     this.db.collection(path).doc(path).set({ data: squareCollection });
    return squareCollection;
  }

  public getRandomColor(): string {
    const letters: string = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  stopStartCube(elem) {
    elem.className = elem.className === 'cube anim-spinnerH' ? 'cube anim-stop' : 'cube anim-spinnerH';
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
