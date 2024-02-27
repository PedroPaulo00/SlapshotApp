import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DetalhesPartidaPage } from './detalhes-partida.page';

describe('DetalhesPartidaPage', () => {
  let component: DetalhesPartidaPage;
  let fixture: ComponentFixture<DetalhesPartidaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalhesPartidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
