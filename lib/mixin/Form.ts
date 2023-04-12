import Vue from 'vue'
import Component from 'vue-class-component'
import ValidableMixin from './Validable'

function fieldsAreValid(component: Vue): boolean {
  const isValidable = (component as ValidableMixin).validable
  let valid = true
  if (isValidable) {
    const validableInstance = component as any as ValidableMixin
    valid = validableInstance.validate
  }

  if (component.$children && component.$children.length) {
    for (const child of component.$children as any[]) {
      if (!fieldsAreValid(child)) {
        valid = false
      }
    }
  }

  return valid
}

function recurseAndAdd(el: any, descendants: any[]) {
  descendants.push(el)
  const children = el.$children
  if (!children) return
  for (let i = 0; i < children.length; i++) {
    recurseAndAdd(children[i], descendants)
  }
}

@Component
export default class FormMixin extends Vue {
  isFormMixin: boolean = true

  allFieldsAreValid() {
    return fieldsAreValid(this)
  }

  private formCanBeSubmitted: boolean = false

  getAllValidableElements() {
    const descendants: any[] = []
    this.$children.forEach((child) => {
      recurseAndAdd(child, descendants)
    })

    return descendants.filter((descendant) => descendant.validable)
  }

  allFieldsAreNotEmpty() {
    const elements = this.getAllValidableElements()
    for (const element of elements) {
      const validableElement = element as ValidableMixin
      if (validableElement.isNotEmpty) continue

      return false
    }

    return true
  }

  preValidate() {
    this.formCanBeSubmitted = this.allFieldsAreNotEmpty()
  }

  get canSubmit(): boolean {
    return this.formCanBeSubmitted
  }
}
