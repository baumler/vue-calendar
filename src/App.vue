<template>
  <div id="app">
    <vue-calendar :calData="monthViewOne"></vue-calendar><br/><br/>
    <vue-calendar :calData="monthViewTwo"></vue-calendar><br/><br/>

    <vue-calendar :calData="weekViewOne"></vue-calendar><br/><br/>
    <vue-calendar :calData="weekViewTwo"></vue-calendar><br/><br/>
    <vue-calendar :calData="weekViewThree"></vue-calendar><br/><br/>
    <vue-calendar :calData="weekViewFour"></vue-calendar><br/><br/>
  </div>
</template>

<script>
import VueCalendar from './components/VueCalendar.vue'

// test date
import Events from './data/events'
import Birthdays from './data/birthdays'

export default {
  name: 'app',
  components: {
    VueCalendar
  },
  data () {
    return {
      tipOptions: {
        arrow: true,
        arrowType: 'round',
        size: 'large',
        a11y: true,
        theme: `dark did`,
        interactive: true,
        arrowTransform: 'scale(1.2)'
      },
      events: [
        Events,
        Birthdays
      ],
      prevNext: {
        show: true,
        prev: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"></path></svg>',
        next: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path></svg>'
      }
    }
  },
  computed: {
    monthViewOne () {
      return {
        view: 'month',
        month: 'current',
        highlightWeekends: true,
        showHeader: true,
        prevNext: this.prevNext,
        events: this.events,
        tipOptions: this.tipOptions
      }
    },
    monthViewTwo () {
      return {
        view: 'month',
        month: 5,
        year: 2018,
        showHeader: true,
        highlightWeekends: false,
        prevNext: this.prevNext,
        events: this.events,
        tipOptions: this.tipOptions
      }
    },
    weekViewOne () {
      return {
        view: 'week',
        week: 'current',
        startOn: 0,
        numberOfWeeks: 2,
        highlightWeekends: true,
        showHeader: true,
        prevNext: this.prevNext,
        events: this.events,
        tipOptions: this.tipOptions
      }
    },
    weekViewTwo () {
      return {
        view: 'week',
        week: '2014-6-6',
        startOn: 2,
        numberOfWeeks: 1,
        highlightWeekends: false,
        showHeader: false,
        prevNext: this.prevNext,
        events: this.events,
        tipOptions: this.tipOptions
      }
    },
    weekViewThree () {
      return {
        view: 'week',
        week: '2018-11-5',
        startOn: 1,
        numberOfWeeks: 2,
        highlightWeekends: true,
        showHeader: true,
        prevNext: this.prevNext,
        events: this.events,
        tipOptions: this.tipOptions
      }
    },
    weekViewFour () {
      return {
        view: 'week',
        week: 'current',
        startOn: 'today',
        numberOfWeeks: 1,
        highlightWeekends: true,
        showHeader: true,
        prevNext: this.prevNext,
        events: this.events,
        tipOptions: this.tipOptions
      }
    }
  }
}
</script>

<style>
  @import '../public/theme.css'; /* tippy theme */
</style>
