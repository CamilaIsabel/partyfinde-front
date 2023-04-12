<template>
  <div
    class="bg-gray-800 rounded-md shadow-6xl px-4 py-2 mt-4 flex items-center justify-start flex-row transition-all duration-250 transform origin-center toast pointer-events-auto z-10000 relative"
    :style="hasPromise ? `width: ${width}px` : ''"
  >
    <component :is="iconComponent" class="flex-shrink-0" />
    <span class="mx-auto px-4 text-sm text-center">{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Checkmark from '~/components/atomic/icon/Checkmark.vue'
import ErrorIcon from '~/components/atomic/icon/ErrorIcon.vue'
import Loader from '~/components/atomic/icon/Loader.vue'

@Component({
  components: { Checkmark, ErrorIcon, Loader },
})
export default class Toast extends Vue {
  @Prop({ default: '' })
  success!: string | ((result: any) => string)

  @Prop({ default: '' })
  error!: string | ((result: any) => string)

  @Prop({ default: null })
  promise!: Promise<any>

  @Prop({ default: 'Loading...' })
  loading!: string

  @Prop({ default: 200 })
  width!: number

  @Prop({ default: 3000 })
  duration!: number

  promiseIsResolved: boolean = false
  promiseFailed: boolean = false
  promiseError: any = null
  promiseSuccess: any = null

  show: boolean = false

  get getError(): string {
    if (this.error instanceof Function) {
      return this.error(this.promiseError)
    }

    return this.error
  }

  get getSuccess(): string {
    if (this.success instanceof Function) {
      return this.success(this.promiseSuccess)
    }

    return this.success
  }

  get iconComponent() {
    if (this.hasPromise && !this.promiseIsResolved) return Loader
    if (this.shouldShowError) return ErrorIcon
    if (this.shouldShowSuccess) return Checkmark

    return null
  }

  get message(): string {
    if (this.hasPromise && !this.promiseIsResolved) return this.loading
    if (this.shouldShowError) return this.getError
    if (this.shouldShowSuccess) return this.getSuccess
    return this.getSuccess
  }

  get hasPromise() {
    return Boolean(this.promise)
  }

  get shouldShowError() {
    if (this.hasPromise) {
      return this.promiseIsResolved && this.promiseFailed
    }
    return Boolean(this.error)
  }

  get shouldShowSuccess() {
    if (this.hasPromise) {
      return this.promiseIsResolved && !this.promiseFailed
    }
    return Boolean(this.success)
  }

  setupPromise() {
    if (!this.hasPromise) {
      this.emitDestroy()
      return
    }
    this.promise
      .then((success) => {
        this.promiseIsResolved = true
        this.promiseFailed = false
        this.promiseSuccess = success
        this.emitDestroy()
      })
      .catch((err) => {
        this.promiseIsResolved = true
        this.promiseFailed = true
        this.promiseError = err
        this.emitDestroy()
      })
  }

  emitDestroy() {
    setTimeout(() => {
      this.$emit('destroy')
    }, this.duration)
  }

  created() {
    this.setupPromise()
    setTimeout(() => {
      this.show = true
    }, 50)
  }
}
</script>

<style>
.toast {
  transition-timing-function: cubic-bezier(0.21, 1.02, 0.73, 1);
}
</style>
