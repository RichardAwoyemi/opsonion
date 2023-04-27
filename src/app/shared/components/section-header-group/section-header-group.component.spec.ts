import { async, TestBed } from '@angular/core/testing';
import { SectionHeaderGroupComponent } from './section-header-group.component';

describe('SectionHeaderGroupComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionHeaderGroupComponent],
    })
      .compileComponents()
      .then(() => {});
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(SectionHeaderGroupComponent);
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
      app.subtitle = 'Test header subtitle';
      fixture.detectChanges();
      expect(document.getElementById('headerTitle').innerText).toBe(app.title);
      expect(document.getElementById('headerSubtitle').innerText).toBe(app.subtitle);
    }));
  });
});
