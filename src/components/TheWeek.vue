<template>
  <div class="vc-view">
    <div v-if="calData.header" class="vc-view-header">
      <a v-if="calData.header.showArrows" class="prev" href="javascript:;" @click="prevWeek">
        <span class="icon" v-html="calData.header.prev ? calData.header.prev : '<<'"></span>
      </a>

      <div class="title">{{thisMonthNameAbb}}</div>

      <a v-if="calData.header.showArrows" class="next" href="javascript:;" @click="nextWeek">
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
          v-for="(date, index) in weekDates"
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
      currentMonthEnd: 0,
      currentYearStart: 0,
      currentYearEnd: 0
    }
  },
  mixins: [ calMixin ],
  components: { TheDay },
  computed: {
    thisMonthNameAbb () {
      let title = ''
      if (this.currentMonthStart === this.currentMonthEnd) {
        title = this.monthNamesAbb[this.currentMonthStart]
        if (this.calData.header.showYear) {
          title += ` ${this.currentYearStart}`
        }
      } else {
        if (this.calData.header.showYear) {
          title = `${this.monthNamesAbb[this.currentMonthStart]} ${this.currentYearStart} - ${this.monthNamesAbb[this.currentMonthEnd]} ${this.currentYearEnd}`
        } else {
          title = `${this.monthNamesAbb[this.currentMonthStart]} - ${this.monthNamesAbb[this.currentMonthEnd]}`
        }
      }
      return title
    }
  },
  methods: {
    getDates () {
      this.currentMonthStart = (this.week.weekStartDate).getMonth()
      this.currentMonthEnd = (addDays(this.week.weekStartDate, this.week.numberOfWeeks * 7)).getMonth()
      this.weekDates = []
      this.currentYearStart = (this.week.weekStartDate).getFullYear()
      this.currentYearEnd = (addDays(this.week.weekStartDate, this.week.numberOfWeeks * 7)).getFullYear()

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
