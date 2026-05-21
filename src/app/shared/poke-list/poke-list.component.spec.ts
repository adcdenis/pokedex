import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeListComponent } from './poke-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('PokeListComponent', () => {
  let component: PokeListComponent;
  let fixture: ComponentFixture<PokeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeListComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
