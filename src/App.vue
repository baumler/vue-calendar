<template>
  <div id="app">
    <vue-calendar :events="events" view="month" :data="monthViewOne"></vue-calendar><br/><br/>
    <!--<vue-calendar :events="events" view="month" :data="monthViewTwo"></vue-calendar><br/><br/>-->
    <vue-calendar :events="events" view="week" :data="weekViewOne"></vue-calendar><br/><br/>
    <!--<vue-calendar :events="events" view="week" :data="weekViewTwo"></vue-calendar><br/><br/>
    <vue-calendar :events="events" view="week" :data="weekViewThree"></vue-calendar><br/><br/>-->
    <vue-calendar :events="events" view="week" :data="weekViewFour"></vue-calendar><br/><br/>
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
      monthViewOne: { month: 'current' },
      monthViewTwo: { month: 2, year: 2018 },
      weekViewOne: { week: 'current', startOn: 0, numberOfWeeks: 2 },
      weekViewTwo: { week: '2014-9-2', startOn: 2, numberOfWeeks: 1 },
      weekViewThree: { week: 'current', startOn: 'today', numberOfWeeks: 2 },
      weekViewFour: { week: 'current', startOn: 'today', numberOfWeeks: 1 }
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
