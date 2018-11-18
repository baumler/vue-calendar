# vue-calendar
> A calendar template for single day events in Vue 2<br/>
> Uses [tippy.js](https://atomiks.github.io/tippyjs/) for tooltip popups

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Options in Detail](#options-in-detail)
- [Cutomize the Theme](#customize-the-theme)

---

##Installation
```
npm install --save vue-calendar
```

In your app, import and add the component
```vue
@import VueCalendar from 'vue-calendar'
export default {
  components: { VueCalendar }
}
```

## Usage
Pass an object through the props
```vue
<vue-calendar :calData="calendarData"></vue-calendar>
...
<script>
export default {
  data () {
    return {
      calendarData: {
        view: 'month',
        month: 'current',
        highlightWeekends: true,
        header: {
          show: true,
          showYear: true,
          showArrows: true,
          prev: 'svg code',
          next: 'svg code'
        },
        tipOptions: {
          arrow: true,
          arrowType: 'round',
          size: 'large',
          a11y: true,
          theme: `dark custom`,
          interactive: true,
          arrowTransform: 'scale(1.2)'
        },
        events: [
          {
            "id": 2,
            "startDate": "2018-11-9",
            "title": "Just a fun day to post",
            "url": "http://someplacewarm.com",
            "desc": "This contains <span class=\"bold\">html</span> markup"
          },
          {
            "id": 4,
            "startDate": "2018-11-18",
            "title": "Another fun post",
            "url": "",
            "desc": "<div class=\"desc\">This also contains <span class=\"uppercase\">html</span> markup</div>"
          }
        ]
      }
    }
  },
  ...
}
</script>
```
You can pass any custom tippy options through `tipOptions`. See [tippy.js](https://atomiks.github.io/tippyjs/) for more options.


### Properties
`view` = 'month' or 'week'

`data` = object
* If month view:
```json
{
  "month": "string or number",
  "year": "number",
  "highlightWeekends": "boolean"
}
```
* If week view:
```json
{
  "week": "string or date",
  "startOn": "string or number",
  "numberOfWeeks": "number",
  "highlightWeekends": "boolean"
}
```

`events` = array of objects
```javascript
[
  {
    "startDate": "YYYY-MM-DD",
    "title": "string", // what shows on the calendar
    "url": "string", // optional, if you want to have a popup of more detail
    "desc": "string" // what is in the detail popup
  },
  {...}
]
```


---

##Options In Detail
#####Basic
\* = required option

| Option              | Type    | Default | Detail                                                              |
| ------------------- | ------- | ------- | ------------------------------------------------------------------- |
| `view`*             | String  | 'month' | 'month' or 'week'                                                   |
| `highlightWeekends` | Boolean | true    | changes the background color of weekend days                        |
| `header`            | Object  |         | see [Header Options](#header-options)                               |
| `events`*           | Array   |         | see [Events](#events)                                               |
| `tipOptions`        | Object  |         | see [tippy.js](https://atomiks.github.io/tippyjs/) for more options |


#####Month Specific Options

| Option  | Type          | Default   | Detail                                     |
| ------- | ------------- | --------- | ------------------------------------------ |
| `month` | String/Number | 'current' | can also be the month number               |
| `year`  | Number        |           | used if month/week is not set to 'current' |

#####Week Specific Options

| Option  | Type          | Default   | Detail                                     |
| ------- | ------------- | --------- | ------------------------------------------ |
| `week`  | String/Number | 'current' | can also be the month number               |
| `year`  | Number        |           | used if month/week is not set to 'current' |

####Header Options

| SubOption    | Type    | Default | Detail                                                            |
| ------------ | ------- | ------- | ----------------------------------------------------------------- |
| `show`       | Boolean | true    | toggle the full header                                            |
| `showYear`   | Boolean | true    | toggle showing the year                                           |
| `showArrows` | Boolean | true    | toggle showing the prev/next arrows                               |
| `prev`       | String  | '<'     | include text or html for what shows for the prev arrow (max 30px) |
| `next`       | String  | '>'     | include text or html for what shows for the next arrow (max 30px) |

####Events
\* = required option

| SubOption     | Type    | Detail                                      |
| ------------- | ------- | ------------------------------------------- |
| `id`*         | Number  | event id                                    |
| `starteDate`* | String  | event start date (YYYY-MM-DD)               |
| `title`*      | String  | event title (what displays on the calendar) |
| `url`         | String  | event link to a different page              |
| `desc`        | String  | displayed in the tooltip                    |

---

##Customize The Theme


---
