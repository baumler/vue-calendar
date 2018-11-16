<template>
  <div :class="['vc-day', {'nonMonth': !date.isMonth}, {'today': isToday}, {'isWeekend': isWeekendDay}]">
    <div class="vc-day-date">{{myDay}}</div>

    <div v-for="(event, index) in events" class="vc-day-event" :key="`e-${index}`">
      <the-event :event="event" :tip-theme="tipTheme"></the-event>
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
    tipTheme: {
      type: String
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
    }
  }
}
</script>
