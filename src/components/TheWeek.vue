<template>
  <div class="vc-week-view">
    <div class="vc-week-header">
      <div><a class="prev" href="javascript:;" @click="prevWeek">&lt;</a></div>
      <div>{{thisMonthNameAbb}}</div>
      <div><a class="next" href="javascript:;" @click="nextWeek">&gt;</a></div>
    </div>

    <div class="vc-month-container">
      <div
          v-for="(day, index) in dayNamesAbb"
          :key="`name-${index}`"
          class="vc-week-day-header"
      >
        {{day}}
      </div>

      <the-day
          v-for="(date, index) in weekDates"
          :key="`date-${index}`"
          :date="date"
          :events="getEventsToShow(date.date)"
          :highlightWeekends="highlightWeekends"
      >
      </the-day>
    </div>
  </div>
</template>

<script>
import calMixin from '../mixins/cal'
import addDays from 'date-fns/add_days'
import addWeeks from 'date-fns/add_weeks'
import subWeeks from 'date-fns/sub_weeks'

import TheDay from './TheDay.vue'

export default {
  props: {
    week: {
      type: Object
    },
    calData: {
      type: Object
    }
  },
  data () {
    return {
      weekDates: [],
      currentMonthStart: 0,
      currentMonthEnd: 0
    }
  },
  mixins: [ calMixin ],
  components: { TheDay },
  computed: {
    thisMonthNameAbb () {
      if (this.currentMonthStart === this.currentMonthEnd) {
        return this.monthNamesAbb[this.currentMonthStart]
      } else {
        return `${this.monthNamesAbb[this.currentMonthStart]} - ${this.monthNamesAbb[this.currentMonthEnd]}`
      }
    }
  },
  methods: {
    getDates () {
      this.currentMonthStart = (this.week.weekStartDate).getMonth()
      this.currentMonthEnd = (addDays(this.week.weekStartDate, this.week.numberOfWeeks * 7)).getMonth()
      this.weekDates = []

      this.weekDates.push({ date: this.week.weekStartDate, isMonth: true })
      for (let i = 1; i < (this.week.numberOfWeeks * 7); i++) {
        this.weekDates.push({ date: addDays(this.week.weekStartDate, i), isMonth: true })
      }
    },
    setDayNameOrder () {
      const newArray = this.dayNamesAbb
      const newOrder = []
      if (this.week.startOn !== 0) {
        for (let i = this.week.startOn; i < 7; i++) {
          newOrder.push(i)
        }
        const newLength = newOrder.length
        if (newLength < 8) {
          const needMore = 7 - newLength
          for (let n = 0; n < needMore; n++) {
            newOrder.push(n)
          }
        }
        this.dayNamesAbb = this.sortArray(newArray, newOrder)
      }
    },
    sortArray (array, order) {
      const newArray = []
      for (let i = 0; i < array.length; i++) {
        newArray.push(array[order[i]])
      }
      return newArray
    },
    nextWeek () {
      this.week.weekStartDate = addWeeks(this.week.weekStartDate, 1)
      this.week.weekOf = addWeeks(this.week.weekOf, 1)
      this.getDates()
    },
    prevWeek () {
      this.week.weekStartDate = subWeeks(this.week.weekStartDate, 1)
      this.week.weekOf = subWeeks(this.week.weekOf, 1)
      this.getDates()
    }
  },
  mounted () {
    this.getDates()
    this.setDayNameOrder()
  }
}
</script>
