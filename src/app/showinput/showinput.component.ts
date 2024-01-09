import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-showinput',
  templateUrl: './showinput.component.html',
  styleUrls: ['./showinput.component.css']
})
export class ShowinputComponent implements OnInit {

  constructor() { }

  openDateSold;
  openDateNotified:any;
  @Input() item:any;
  @Input() comment: any;
  sendcomment: any;
  @Output() commentsend: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    // console.log(this.item);
    // console.log(this.comment);
    this.openDateSold = false;
  }
  showDateSold() {
    this.openDateSold = !this.openDateSold;
  }

  sendComment() {
    // console.log(this.comment);
    this.item['comment'] = this.comment;
    // console.log(this.item);
    this.commentsend.emit({
      obj: this.item
    });
  }

}
