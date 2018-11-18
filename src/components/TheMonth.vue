<template>
  <div class="vc-view">
    <div v-if="calData.header.show" class="vc-view-header">
      <a v-if="calData.header.showArrows" class="prev" href="javascript:;" @click="prevMonth">
        <span class="icon" v-html="calData.header.prev ? calData.header.prev : '<<'"></span>
      </a>

      <div v-if="calData.header.showYear" class="title">{{thisMonthNameAbb}} {{currentYear}}</div>
      <div v-else class="title">{{thisMonthNameAbb}}</div>

      <a v-if="calData.header.showArrows" class="next" href="javascript:;" @click="nextMonth">
        <span class="icon" v-html="calData.header.next ? calData.header.next : '>>'"></span>
      </a>
    </div>

    <div class="vc-view-container">
      <div
          v-for="(day, index) in dayNamesAbb"
          :key="`name-${index}`"
          class="vc-view-day-header"
      >
        {{day}}
      </div>

      <the-day
          v-for="(date, index) in monthDates"
          :key="`date-${index}`"
          :date="date"
          :events="getEventsToShow(date.date)"
          :highlight-weekends="highlightWeekends"
          :tip-options="tipOptions"
      >
      </the-day>
    </div>
  </div>
</template>

<script>
import calMixin from '../mixins/cal'
import getDay from 'date-fns/get_day'
import getDaysInMonth from 'date-fns/get_days_in_month'

import TheDay from './TheDay.vue'

export default {
  props: {
    calData: {
      type: Object
    }
  },
  data () {
    return {
      currentMonth: 0,
      currentYear: 0,
      monthDates: []
    }
  },
  mixins: [ calMixin ],
  components: { TheDay },
  computed: {
    thisMonthNameAbb () {
      return this.monthNamesAbb[this.currentMonth]
    },
    dayOfWeekMonthStartsOn () {
      return getDay(new Date(this.currentYear, this.currentMonth, 1))
    },
    numberOfDaysInMonth () {
      return getDaysInMonth(new Date(this.currentYear, this.currentMonth, 1))
    }
  },
  methods: {
    getDates () {
      this.monthDates = []

      // get the actual month dates
      for (let i = 1; i <= this.numberOfDaysInMonth; i++) {
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
      const dayEndOfThisMonth = getDay(new Date(this.currentYear, this.currentMonth, this.numberOfDaysInMonth))
      if (dayEndOfThisMonth < 7) {
        const yearForNext = this.currentMonth !== 11 ? this.currentYear : this.currentYear + 1
        const monthForNext = this.currentMonth !== 11 ? this.currentMonth + 1 : 0
        for (let i = 1; i < (7 - dayEndOfThisMonth); i++) {
          this.monthDates.push({ date: new Date(yearForNext, monthForNext, i), isMonth: false })
        }
      }
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
    this.currentMonth = this.getCurrentMonth().month - 1
    this.currentYear = this.getCurrentMonth().year
    this.getDates()
  }
}
</script>
