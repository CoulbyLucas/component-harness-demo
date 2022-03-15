import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../material/material.module'

import { SpecialFormComponent } from './special-form.component'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatFormFieldHarness } from '@angular/material/form-field/testing'
import { MatInputHarness } from '@angular/material/input/testing'
import { MatButtonHarness } from '@angular/material/button/testing'

describe('SpecialFormComponent', () => {
  let component: SpecialFormComponent
  let fixture: ComponentFixture<SpecialFormComponent>
  let loader: HarnessLoader
  let submitBtn: MatButtonHarness

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialFormComponent],
      imports: [ReactiveFormsModule, MaterialModule, NoopAnimationsModule],
    }).compileComponents()
  })

  beforeEach(async () => {
    fixture = TestBed.createComponent(SpecialFormComponent)
    loader = TestbedHarnessEnvironment.loader(fixture)
    component = fixture.componentInstance
    submitBtn = await loader.getHarness(
      MatButtonHarness.with({ text: 'Submit' })
    )
    component.ngOnInit()
    fixture.detectChanges()
  })

  async function fillInputs(
    name: string,
    firstName: string,
    birthYear: string
  ) {
    const inputs = await loader.getAllHarnesses(MatInputHarness)
    await inputs[0].setValue(name)
    await inputs[1].setValue(firstName)
    await inputs[2].setValue(birthYear)
  }

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('FormField', () => {
    it('should have "legacy" appearence.', async () => {
      const formFields = await loader.getAllHarnesses(MatFormFieldHarness)
      for (const field of formFields) {
        await expectAsync(field.getAppearance()).toBeResolvedTo('legacy')
      }
    })
    it('should have an error when name field is invalid.', async () => {
      const inputName = await loader.getHarness(
        MatInputHarness.with({ selector: '#name' })
      )
      await inputName.setValue('')
      const hostEl = await inputName.host()
      await expectAsync(hostEl.hasClass('ng-invalid')).toBeResolvedTo(true)
    })
  })

  describe('SubmitButton', () => {
    it('should be disabled when no data is provided.', async () => {
      await expectAsync(submitBtn.isDisabled()).toBeResolvedTo(true)
    })

    it('should be disabled when invalid data is provided.', async () => {
      await fillInputs('', '', '')
      await expectAsync(submitBtn.isDisabled()).toBeResolvedTo(true)
    })

    it('should be enabled when the data provided is valid.', async () => {})
  })

  describe('SubmitMethod', () => {
    it('should not have been called when invalid data is provided.', async () => {
      spyOn(component, 'submit')
      await fillInputs('', '', '')
      await submitBtn.click()

      expect(component.submit).not.toHaveBeenCalled()
    })
    it('should have been called when valid data is provided.', async () => {
      spyOn(component, 'submit')
      await fillInputs('Joel', 'Digbeu', '2002')
      await submitBtn.click()

      expect(component.submit).toHaveBeenCalled()
    })
  })
})
