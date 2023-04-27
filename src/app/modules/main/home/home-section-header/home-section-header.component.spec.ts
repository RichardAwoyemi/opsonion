import { async, TestBed } from '@angular/core/testing';
import { HomeSectionHeaderComponent } from './home-section-header.component';

describe('HomeSectionHeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSectionHeaderComponent],
    })
      .compileComponents()
      .then(() => {});
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeSectionHeaderComponent);
      app = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
      fixture.destroy();
      app = null;
    });

    it('should create the component', async(() => {
      expect(app).toBeTruthy();
    }));

    it('should have a header title', async(() => {
      app.title = 'Test header title';
      fixture.detectChanges();
      expect(document.getElementById('sectionHeaderTitle').innerText).toBe(app.title);
    }));
  });
});
