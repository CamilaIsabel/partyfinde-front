import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Component
export default class RequestMixin extends Vue {
  request: Promise<any> = Promise.resolve(null)
  isRequesting: boolean = false

  @Watch('request')
  updateIsRequesting() {
    this.isRequesting = true
    this.request
      .then(this.requestCompletedSuccessfully)
      .catch(this.requestFailed)
      .finally(this.finishRequest)
      .finally(() => {
        this.isRequesting = false
      })
  }

  finishRequest() {}

  requestCompletedSuccessfully(_reason: any) {}

  requestFailed(_reason: any) {}
}
