import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ISquareElement} from "../../interfaces/squre-element";

@Component({
  selector: 'square-element-item',
  templateUrl: './square-element-item.component.html',
  styleUrls: ['./square-element-item.component.css']
})
export class SquareElementItemComponent {
  @Input() square: ISquareElement;
  @Output() onColorChange = new EventEmitter<number>();

  onSquareClick(id) {
    this.onColorChange.emit(id);
    console.log(this.square)
  }
}
