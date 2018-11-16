<template>
  <div class="vc">
    <the-month v-if="viewType === 'month'" :calData="calData"></the-month>
    <the-week v-else-if="viewType === 'week'" :week="currentWeek" :calData="calData"></the-week>
  </div>
</template>

<script>
import 'tippy.js/dist/tippy.css'
import startOfWeek from 'date-fns/start_of_week'

import TheMonth from './TheMonth.vue'
import TheWeek from './TheWeek.vue'

export default {
  props: {
    calData: {
      type: Object,
      required: true
    }
  },
  components: {
    TheMonth,
    TheWeek
  },
  computed: {
    viewType () {
      if (this.calData.view) {
        return this.calData.view
      }
      return 'month'
    },
    currentMonth () {
      if (this.calData.month === 'current') {
        const today = new Date()
        const m = today.getMonth()
        const y = today.getFullYear()
        return {
          month: m + 1,
          year: y
        }
      } else {
        return {
          month: (this.calData.month * 1),
          year: this.calData.year
        }
      }
    },
    currentWeek () {
      if (this.calData.week === 'current') {
        if (typeof this.calData.startOn === 'number') {
          const today = new Date()
          const startWeek = startOfWeek(today, { weekStartsOn: this.calData.startOn })

          return {
            weekOf: today,
            weekStartDate: startWeek,
            startOn: this.calData.startOn,
            numberOfWeeks: this.calData.numberOfWeeks
          }
        } else {
          const today = new Date()
          const startOn = today.getDay()

          return {
            weekOf: today,
            weekStartDate: today,
            startOn: startOn,
            numberOfWeeks: this.calData.numberOfWeeks
          }
        }
      } else {
        const startWeek = startOfWeek(new Date(this.calData.week), { weekStartsOn: this.calData.startOn })

        return {
          weekOf: new Date(this.calData.week),
          weekStartDate: startWeek,
          startOn: this.calData.startOn,
          numberOfWeeks: this.calData.numberOfWeeks
        }
      }
    }
  },
  methods: {
    allEvents () {
      let arr = []

      for (let i = 0; i < this.calData.events.length; i++) {
        arr = arr.concat(this.calData.events[i])
      }
      return arr
    }
  },
  beforeMount () {
    this.calData.events = this.allEvents()
  }
}
</script>

<style lang="scss">
@import '../scss/main';
</style>
