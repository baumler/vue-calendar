import isSameDay from 'date-fns/is_same_day'

const cal = {
  data () {
    return {
      dayNamesAbb: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthNamesAbb: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    }
  },
  computed: {
    highlightWeekends () {
      return this.calData.highlightWeekends
    }
  },
  methods: {
    getCurrentMonth () {
      if (this.calData.month === 'current') {
        const today = new Date()
        const m = today.getMonth()
        const y = today.getFullYear()
        return {
          month: m + 1,
          year: y
        }
      } else {
        return {
          month: (this.calData.month * 1),
          year: this.calData.year
        }
      }
    },
    splitEventDates (event) {
      const p = event.split('-')
      // because months in JS start at 0
      p[1] = p[1] - 1
      return p
    },
    getEventsToShow (thisDate) {
      const showing = []

      for (let i = 0; i < this.calData.events.length; i++) {
        const sp = this.splitEventDates(this.calData.events[i].startDate)
        if (isSameDay(new Date(sp[0], sp[1], sp[2], 0, 0, 0), thisDate)) {
          showing.push(this.calData.events[i])
        }
      }

      return showing
    }
  }
}

export default cal
