import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'floatingButton',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
  standalone: true
})
export class FloatingButtonComponent  implements OnInit {

  @Input()
  text : string = 'default';

  constructor() { }

  ngOnInit() {}

}
