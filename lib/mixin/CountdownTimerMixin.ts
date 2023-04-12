import Vue from 'vue'
import Component from 'vue-class-component'
import { format } from 'light-date'
import { toDateTime } from '../misc/DateUtils'

@Component
export default class CountdownTimerMixin extends Vue {
  secondsSince: number = 0
  interval: any = null

  startTimer() {
    this.stopTimer()
    this.interval = setInterval(() => {
      this.secondsSince++
    }, 1000)
  }

  stopTimer() {
    this.secondsSince = 0
    clearInterval(this.interval)
  }

  destroyed() {
    this.stopTimer()
  }

  get remainingSeconds() {
    const remaining = this.timer - this.secondsSince
    if (remaining < 0) return 0
    return remaining
  }

  get formattedRemainingSeconds() {
    let remaining = this.remainingSeconds
    if (remaining < 0) remaining = 0

    return format(toDateTime(remaining), this.format)
  }

  get format() {
    return '{mm}:{ss}'
  }

  get timer() {
    return 60
  }
}
