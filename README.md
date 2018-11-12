# vue-calendar
> Subtitle here

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)

---

##Installation


---

## Usage
In your app, import and add the component
```
@import VueCalendar from 'vue-calendar'
```

```javascript
components: { VueCalendar }
```


In the html/template
```html
<vue-calendar view="month" :events="[]" :data="{}"></vue-calendar>
```
You must pass all three properties


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

##Options
#####Month

String = 'current'

Number = month number starting at 0
