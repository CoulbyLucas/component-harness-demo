import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CustomHarness } from '../custom-harness'

import { NavComponent } from './nav.component'

fdescribe('NavComponent', () => {
  let component: NavComponent
  let fixture: ComponentFixture<NavComponent>
  let loader: HarnessLoader

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent)
    loader = TestbedHarnessEnvironment.loader(fixture)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have mat-toolbar element', async () => {
    const element = await loader.getHarness(CustomHarness)
    expect(element).toBeTruthy()
  })

  it('should contain hello', async () => {
    const element = await loader.getHarness(CustomHarness)

    await expectAsync(element.getText('p')).toBeResolvedTo('Hello')
  })
})
