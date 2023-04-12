import Vue from 'vue'
import Component from 'vue-class-component'

const singletonMap: Map<string, SingletonMixin> = new Map()

@Component
export default class SingletonMixin extends Vue {
  mounted() {
    singletonMap.set(this.getSingletonIdentifier(), this)
  }

  getSingletonIdentifier() {
    return 'default'
  }
}

export const getSingletonComponent = (
  key: string
): SingletonMixin | undefined => {
  return singletonMap.get(key)
}
