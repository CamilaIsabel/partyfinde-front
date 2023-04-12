import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch, Prop } from 'vue-property-decorator'
import FormMixin from './Form'

@Component
export default class ValidableMixin extends Vue {
  validated: boolean = false
  validable: boolean = true
  error: string | boolean = ''

  value!: string

  @Prop({ default: () => () => true })
  validation!: (arg: string) => boolean | boolean

  get validate(): boolean {
    this.validated = true
    const error = this.validation(this.value)
    if (error !== true) {
      this.error = error
      return false
    }

    return this.isValid
  }

  resetValidation() {
    this.error = ''
    this.validated = false
  }

  @Watch('isNotEmpty')
  valueWatcher() {
    this.update()
  }

  update() {
    const form = this.getForm() as FormMixin
    if (!form) return
    form.preValidate()
  }

  getForm() {
    let parent = this.$parent as any
    while (true) {
      if (!parent) return null
      if (!parent.isFormMixin) {
        parent = parent.$parent
        continue
      }

      return parent
    }
  }

  get isValid() {
    return true
  }

  get isNotEmpty() {
    return true
  }

  get showErrors() {
    return this.validated && !this.isValid
  }
}
