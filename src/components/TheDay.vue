<template>
  <div :class="['vc-day', {'nonMonth': !date.isMonth}, {'today': isToday}, {'isWeekend': isWeekendDay}]">
    <div class="vc-day-date">{{myDay}}</div>
    <!--<slot name="events"></slot>-->
    <div v-for="(event, index) in myEvents" class="vc-day-event" :key="`e-${index}`">
      <div class="vc-day-event-title" v-html="event.title"></div>
      <div class="vc-day-event-desc" v-html="event.desc"></div>
    </div>
  </div>
</template>

<script>
import getDate from 'date-fns/get_date'
import isSameDay from 'date-fns/is_same_day'
import isWeekend from 'date-fns/is_weekend'

export default {
  props: {
    date: {
      type: Object,
      required: true
    },
    events: {
      type: Array
    }
  },
  computed: {
    myDay () {
      return getDate(this.date.date)
    },
    myEvents () {
      const event = []
      for (let i = 0; i < this.events.length; i++) {
        if (isSameDay(new Date(this.events[i].startDate), this.date.date)) {
          event.push(this.events[i])
        }
      }
      return event
    },
    isToday () {
      const today = new Date()
      return isSameDay(today, this.date.date)
    },
    isWeekendDay () {
      return isWeekend(this.date.date)
    }
  }
}
</script>
