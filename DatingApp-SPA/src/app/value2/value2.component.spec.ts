/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Value2Component } from './value2.component';

describe('Value2Component', () => {
  let component: Value2Component;
  let fixture: ComponentFixture<Value2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Value2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Value2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
