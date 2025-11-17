/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BusRouteMap } from './bus-route-map.component';

describe('LocationPickerComponent', () => {
  let component: BusRouteMap;
  let fixture: ComponentFixture<BusRouteMap>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusRouteMap],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusRouteMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
