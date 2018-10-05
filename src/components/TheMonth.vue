<template>
  <div class="vc-month-view">
    <div class="vc-month-header">
      <div><a class="prev" href="javascript:;" @click="prevMonth">&lt;</a></div>
      <div>{{thisMonthNameAbb}} {{currentYear}}</div>
      <div><a class="next" href="javascript:;" @click="nextMonth">&gt;</a></div>
    </div>

    <div class="vc-month-container">
      <div
          v-for="(day, index) in dayNamesAbb"
          :key="`name-${index}`"
          class="vc-month-day-header"
      >
        {{day}}
      </div>

      <the-day
          v-for="(date, index) in monthDates"
          :key="`date-${index}`"
          :date="date"
          :events="getEventsToShow(date.date)"
      >
      </the-day>
    </div>
  </div>
</template>

<script>
import getDay from 'date-fns/get_day'
import getDaysInMonth from 'date-fns/get_days_in_month'
import isSameDay from 'date-fns/is_same_day'

import TheDay from './TheDay.vue'

export default {
  props: {
    month: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    events: {
      type: Array
    }
  },
  data () {
    return {
      currentMonth: 0,
      currentYear: 0,
      dayNamesAbb: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthNamesAbb: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      monthDates: []
    }
  },
  components: { TheDay },
  computed: {
    thisMonthNameAbb () {
      return this.monthNamesAbb[this.currentMonth]
    },
    dayOfWeekMonthStartsOn () {
      return getDay(new Date(this.currentYear, this.currentMonth, 1))
    },
    numberOdDaysInMonth () {
      return getDaysInMonth(new Date(this.currentYear, this.currentMonth, 1))
    }
  },
  methods: {
    getDates () {
      this.monthDates = []

      // get the actual month dates
      for (let i = 1; i <= this.numberOdDaysInMonth; i++) {
        this.monthDates.push({ date: new Date(this.currentYear, this.currentMonth, i), isMonth: true })
      }

      // get dates in first week in previous month
      const lastMonthEndDate = getDaysInMonth(new Date(this.currentYear, this.currentMonth - 1, 1))
      if (this.dayOfWeekMonthStartsOn > 0) {
        const yearForPrev = this.currentMonth !== 0 ? this.currentYear : this.currentYear - 1
        const monthForPrev = this.currentMonth !== 0 ? this.currentMonth - 1 : 11
        for (let i = 0; i < this.dayOfWeekMonthStartsOn; i++) {
          this.monthDates.unshift({ date: new Date(yearForPrev, monthForPrev, lastMonthEndDate - i), isMonth: false })
        }
      }
      // get dates in last week next month
      const dayEndOfThisMonth = getDay(new Date(this.currentYear, this.currentMonth, this.numberOdDaysInMonth))
      if (dayEndOfThisMonth < 7) {
        const yearForNext = this.currentMonth !== 11 ? this.currentYear : this.currentYear + 1
        const monthForNext = this.currentMonth !== 11 ? this.currentMonth + 1 : 0
        for (let i = 1; i < (7 - dayEndOfThisMonth); i++) {
          this.monthDates.push({ date: new Date(yearForNext, monthForNext, i), isMonth: false })
        }
      }
    },
    getEventsToShow (thisDate) {
      const showing = []

      for (let i = 0; i < this.events.length; i++) {
        if (isSameDay(new Date(this.events[i].startDate), thisDate)) {
          showing.push(this.events[i])
        }
      }

      return showing
    },
    nextMonth () {
      if (this.currentMonth === 11) {
        this.currentMonth = 0
        this.currentYear = this.currentYear + 1
      } else {
        this.currentMonth = this.currentMonth + 1
      }
      this.getDates()
    },
    prevMonth () {
      if (this.currentMonth === 0) {
        this.currentMonth = 11
        this.currentYear = this.currentYear - 1
      } else {
        this.currentMonth = this.currentMonth - 1
      }
      this.getDates()
    }
  },
  mounted () {
    this.currentMonth = this.month - 1
    this.currentYear = this.year
    this.getDates()
  }
}
</script>
