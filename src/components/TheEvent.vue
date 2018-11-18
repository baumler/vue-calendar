<template>
  <div v-if="event.url" :href="event.url" :class="'js-tip-'+event.id">
    <div class="vc-day-event-title" v-html="event.title"></div>
    <div v-if="event.desc" class="vc-day-event-desc" data-id="event.id" v-html="event.desc"></div>
  </div>
  <div v-else :class="'js-tip-'+event.id">
    <div class="vc-day-event-title" v-html="event.title"></div>
    <div v-if="event.desc" class="vc-day-event-desc" data-id="event.id" v-html="event.desc"></div>
  </div>
</template>

<script>
import tippy from 'tippy.js'

export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    tipOptions: {
      type: Object
    }
  },
  mounted () {
    if (this.event.desc) {
      const opts = this.tipOptions
      tippy(`.js-tip-${this.event.id}`, {
        ...opts,
        content: this.event.desc
      })
    }
  }
}
</script>
