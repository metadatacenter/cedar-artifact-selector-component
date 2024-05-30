import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactSelectorComponent } from './artifact-selector.component';

describe('ArtifactSelectorComponent', () => {
  let component: ArtifactSelectorComponent;
  let fixture: ComponentFixture<ArtifactSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtifactSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtifactSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
