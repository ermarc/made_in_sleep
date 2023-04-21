import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'floatingMessage',
  templateUrl: './floating-message.component.html',
  styleUrls: ['./floating-message.component.scss'],
  standalone: true
})
export class FloatingMessageComponent  implements OnInit {

  @Input()
  text : string = 'default';

  constructor() { }

  ngOnInit() {}

}
