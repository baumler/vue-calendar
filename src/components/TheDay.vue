<template>
  <div :class="['vc-day', {'nonMonth': !date.isMonth}, {'today': isToday}, {'isWeekend': isWeekendDay}]">
    <div class="vc-day-date">{{myDay}}</div>

    <div v-for="(event, index) in myEvents" class="vc-day-event" :key="`e-${index}`">
      <a v-if="event.url" :href="event.url" @mouseover="showTooltip($event)" @mouseout="hideTooltip($event)">
        <div class="vc-day-event-title" v-html="event.title"></div>
        <div v-if="event.desc" class="vc-day-event-desc" v-html="event.desc"></div>
      </a>
      <div v-else>
        <div class="vc-day-event-title" v-html="event.title"></div>
        <div v-if="event.desc" class="vc-day-event-desc">
          <div v-html="event.desc"></div>
        </div>
      </div>
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
    },
    highlightWeekends: {
      type: Boolean
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
      if (this.highlightWeekends) {
        return isWeekend(this.date.date)
      }
    }
  },
  methods: {
    showTooltip (e) {
      const t = e.target.closest('.vc-day-event')
      t.querySelector('.vc-day-event-desc').classList.add('show')
    },
    hideTooltip (e) {
      const t = e.target.closest('.vc-day-event')
      t.querySelector('.vc-day-event-desc').classList.remove('show')
    }
  }
}
</script>
