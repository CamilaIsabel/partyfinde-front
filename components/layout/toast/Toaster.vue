<template>
  <transition-group
    name="toast"
    enter-class="opacity-0 scale-50 -translate-y-full origin-center"
    leave-active-class="origin-center toaster-leave-active"
    leave-to-class="opacity-0 toaster-leave-to origin-center"
    leave-class="opacity-100 scale-100 origin-center toaster-leave"
    duration="250"
    class="z-10000 overflow-hidden pb-24 pointer-events-none fixed top-0 transform w-full flex items-center justify-end flex-col toaster"
    tag="div"
  >
    <Toast
      v-for="toast in toasts"
      v-bind="toast"
      :key="toast.id"
      @destroy="removeToast(toast.id)"
    />
  </transition-group>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import Toast from '@/components/layout/toast/Toast.vue'
import SingletonMixin from '@/lib/mixin/SingletonMixin'
import {
  PromiseSettings,
  ToasterType,
  ToastSettings,
  ToastType,
} from '~/lib/toaster/Toaster'

@Component({
  components: { Toast },
})
export default class Toaster
  extends Mixins(SingletonMixin)
  implements ToasterType
{
  toasts: ToastType[] = []

  addToast(toast: any) {
    const newToast = {
      ...toast,
      id: '_' + Math.random().toString(36).substr(2, 9),
    }
    this.toasts.push(newToast)
  }

  toastsToAdd: Toast[] = []

  removeToast(id?: string) {
    const toastIndex = this.toasts.findIndex((entry) => entry.id === id)
    this.$delete(this.toasts, toastIndex)
  }

  success(message: string, options: ToastSettings = {}) {
    this.addToast({ ...options, success: message })
  }

  error(message: string, options: ToastSettings = {}) {
    this.addToast({ ...options, error: message })
  }

  promise(promise: Promise<any>, options: PromiseSettings) {
    this.addToast({ promise, ...options })
  }

  getSingletonIdentifier() {
    return 'toaster'
  }
}
</script>

<style>
.toast-move {
  transition: all 250ms;
}

.toaster-leave {
  transform: translateY(calc(100% + 1rem)) scale(1);
}

.toaster-leave-to {
  transform: translateY(-75%) scale(0.2);
}

.toaster-leave-active {
  position: absolute !important;
  z-index: 150 !important;
}
</style>
