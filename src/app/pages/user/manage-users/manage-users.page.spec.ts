import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersPage } from './manage-users.page';

describe('ManageUsersPage', () => {
  let component: ManageUsersPage;
  let fixture: ComponentFixture<ManageUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
