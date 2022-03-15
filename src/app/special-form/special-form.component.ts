import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

const { required, min, max } = Validators

export interface FormValue {
  name: string
  firstName: string
  birthYear: number
}

@Component({
  selector: 'app-special-form',
  templateUrl: './special-form.component.html',
  styleUrls: ['./special-form.component.scss'],
})
export class SpecialFormComponent implements OnInit {
  currentYear = new Date().getFullYear()
  minYear = 1970

  form: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', [required]],
      firstName: ['', [required]],
      birthYear: ['', [min(this.minYear), max(this.currentYear)]],
    })
  }

  submit() {
    console.log(this.form.value)
  }
}
