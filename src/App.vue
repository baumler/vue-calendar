<template>
  <div id="app">
    <vue-calendar :events="events" :data="monthViewOne"></vue-calendar><br/><br/>
    <!--<vue-calendar :events="events" :data="monthViewTwo"></vue-calendar><br/><br/>-->

    <!--<vue-calendar :events="events" :data="weekViewOne"></vue-calendar><br/><br/>-->
    <!--<vue-calendar :events="events" :data="weekViewTwo"></vue-calendar><br/><br/>-->
    <vue-calendar :events="events" :data="weekViewThree"></vue-calendar><br/><br/>
    <vue-calendar :events="events" :data="weekViewFour"></vue-calendar><br/><br/>
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
      monthViewOne: { view: 'month', month: 'current', highlightWeekends: true },
      monthViewTwo: { view: 'month', month: 5, year: 2018 },
      weekViewOne: { view: 'week', week: 'current', startOn: 0, numberOfWeeks: 2, highlightWeekends: false },
      weekViewTwo: { view: 'week', week: '2014-6-6', startOn: 2, numberOfWeeks: 1 },
      weekViewThree: { view: 'week', week: '2018-11-5', startOn: 1, numberOfWeeks: 2 },
      weekViewFour: { view: 'week', week: 'current', startOn: 'today', numberOfWeeks: 1, highlightWeekends: true }
    }
  },
  computed: {
    events () {
      const allEvents = []
      allEvents.push(Events)
      allEvents.push(Birthdays)
      return allEvents
    }
  }
}
</script>
