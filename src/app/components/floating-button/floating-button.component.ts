import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'floatingButton',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
  standalone: true
})
export class FloatingButtonComponent  implements OnInit {

  @Input()
  text : string = 'default';

  @Input()
  position : string = 'fixed';

  @Input()
  link : string = '';

  constructor(private router: Router) { }

  ngOnInit() {}

  autoNavigate() {
    this.router.navigate([this.link])
  }

}
