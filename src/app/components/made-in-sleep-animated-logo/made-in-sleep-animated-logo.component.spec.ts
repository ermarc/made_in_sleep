import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MadeInSleepAnimatedLogoComponent } from './made-in-sleep-animated-logo.component';

describe('MadeInSleepAnimatedLogoComponent', () => {
  let component: MadeInSleepAnimatedLogoComponent;
  let fixture: ComponentFixture<MadeInSleepAnimatedLogoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MadeInSleepAnimatedLogoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MadeInSleepAnimatedLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
