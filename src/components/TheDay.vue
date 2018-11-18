<template>
  <div :class="['vc-day', {'nonMonth': !date.isMonth}, {'today': isToday}, {'isWeekend': isWeekendDay}]">
    <div class="vc-day-date">{{myDay}}</div>

    <div v-for="(event, index) in sortedEvents" class="vc-day-event" :key="`e-${index}`">
      <the-event :event="event" :tip-options="tipOptions"></the-event>
    </div>
  </div>
</template>

<script>
import getDate from 'date-fns/get_date'
import isSameDay from 'date-fns/is_same_day'
import isWeekend from 'date-fns/is_weekend'
import TheEvent from './TheEvent'

export default {
  props: {
    date: {
      type: Object,
      required: true
    },
    events: {
      type: Array
    },
    highlightWeekends: {
      type: Boolean
    },
    tipOptions: {
      type: Object
    }
  },
  components: { TheEvent },
  computed: {
    myDay () {
      return getDate(this.date.date)
    },
    isToday () {
      const today = new Date()
      return isSameDay(today, this.date.date)
    },
    isWeekendDay () {
      if (this.highlightWeekends) {
        return isWeekend(this.date.date)
      }
    },
    sortedEvents () {
      return this.getSortedEvents()
    }
  },
  methods: {
    compareObjects (a, b) {
      const aTime = a.startTime ? a.startTime : '12:01 am'
      const bTime = b.startTime ? b.startTime : '12:01 am'
      const compA = new Date('1/1/99 ' + aTime)
      const compB = new Date('1/1/99 ' + bTime)

      if (compA > compB) {
        return 1
      } else if (compA < compB) {
        return -1
      }
    },
    getSortedEvents () {
      return this.events.sort(this.compareObjects)
    }
  }
}
</script>
