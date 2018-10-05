<template>
  <div class="vc">
    <the-month v-if="view === 'month'" :month="currentMonth.month" :year="currentMonth.year" :events="allEvents"></the-month>
    <the-week v-else-if="view === 'week'" :week="currentWeek" :events="allEvents"></the-week>
  </div>
</template>

<script>
import startOfWeek from 'date-fns/start_of_week'

import TheMonth from './TheMonth.vue'
import TheWeek from './TheWeek.vue'

export default {
  props: {
    events: {
      type: Array
    },
    view: {
      type: String,
      required: true,
      default: 'month'
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    TheMonth,
    TheWeek
  },
  computed: {
    allEvents () {
      let arr = []

      for (let i = 0; i < this.events.length; i++) {
        arr = arr.concat(this.events[i])
      }
      return arr
    },
    currentMonth () {
      if (this.data.month === 'current') {
        const today = new Date()
        const m = today.getMonth()
        const y = today.getFullYear()
        return {
          month: m + 1,
          year: y
        }
      } else {
        return {
          month: this.data.month,
          year: this.data.year
        }
      }
    },
    currentWeek () {
      if (this.data.week === 'current') {
        if (typeof this.data.startOn === 'number') {
          const today = new Date()
          const startWeek = startOfWeek(today, { weekStartsOn: this.data.startOn })

          return {
            weekOf: today,
            weekStartDate: startWeek,
            startOn: this.data.startOn,
            numberOfWeeks: this.data.numberOfWeeks
          }
        } else {
          const today = new Date()
          const startOn = today.getDay()

          return {
            weekOf: today,
            weekStartDate: today,
            startOn: startOn,
            numberOfWeeks: this.data.numberOfWeeks
          }
        }
      } else {
        const startWeek = startOfWeek(new Date(this.data.week), { weekStartsOn: this.data.startOn })

        return {
          weekOf: new Date(this.data.week),
          weekStartDate: startWeek,
          startOn: this.data.startOn,
          numberOfWeeks: this.data.numberOfWeeks
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/main';
</style>
