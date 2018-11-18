<template>
  <div id="app">
    <vue-calendar :calData="monthViewOne"></vue-calendar><br/><br/>
    <!--<vue-calendar :calData="monthViewTwo"></vue-calendar><br/><br/>-->

    <!--<vue-calendar :calData="weekViewOne"></vue-calendar><br/><br/>-->
    <!--<vue-calendar :calData="weekViewTwo"></vue-calendar><br/><br/>-->
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
      monthViewOne: {
        view: 'month',
        month: 'current',
        highlightWeekends: true,
        events: [
          Events,
          Birthdays
        ],
        tipOptions: {
          arrow: true,
          arrowType: 'round',
          size: 'large',
          a11y: true,
          theme: `dark did`,
          interactive: true,
          trigger: 'click',
          arrowTransform: 'scale(1.2)'
        }
      },
      monthViewTwo: { view: 'month', month: 5, year: 2018, tiptheme: 'did', events: [Events, Birthdays] },
      weekViewOne: { view: 'week', week: 'current', startOn: 0, numberOfWeeks: 2, highlightWeekends: false, tiptheme: 'did', events: [Events, Birthdays] },
      weekViewTwo: { view: 'week', week: '2014-6-6', startOn: 2, numberOfWeeks: 1, tiptheme: 'did', events: [Events, Birthdays] },
      weekViewThree: { view: 'week', week: '2018-11-5', startOn: 1, numberOfWeeks: 2, tiptheme: 'did', events: [Events, Birthdays] },
      weekViewFour: { view: 'week', week: 'current', startOn: 'today', numberOfWeeks: 1, highlightWeekends: true, tiptheme: 'did', events: [Events, Birthdays] }
    }
  }
}
</script>

<style>
  @import '../public/theme.css'; /* tippy theme */
</style>
