import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoardModal } from './edit-board-modal';

describe('EditBoardModal', () => {
  let component: EditBoardModal;
  let fixture: ComponentFixture<EditBoardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBoardModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBoardModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
