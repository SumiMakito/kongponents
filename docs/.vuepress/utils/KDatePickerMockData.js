const CHART_DATA_REQUEST_TRIM = 10

export const TimeframeKeys = {
  FIFTEEN_MIN: '15m',
  ONE_HOUR: '1h',
  THREE_HOUR: '3h',
  SIX_HOUR: '6h',
  TWELVE_HOUR: '12h',
  ONE_DAY: '24h',
  SEVEN_DAY: '7d',
  THIRTY_DAY: '30d',
  CURRENT_WEEK: 'current_week',
  CURRENT_MONTH: 'current_month',
  CURRENT_QUARTER: 'current_quarter',
  PREVIOUS_WEEK: 'previous_week',
  PREVIOUS_MONTH: 'previous_month',
  PREVIOUS_QUARTER: 'previous_quarter'
}

export class Timeframe {
  timeframeLength
  timeframeText 

  constructor (opts) {
    this.timeframeLength = opts.timeframeLength
    this.timeframeText = opts.timeframeText
  }

  end () {
    return Date.now() - CHART_DATA_REQUEST_TRIM
  }

  start () {
    return this.end() - this.timeframeLength()
  }

  deltaStart () {
    return this.end() - (2 * this.timeframeLength())
  }
}

class PreviousWeek extends Timeframe {
  end () {
    const lastMonday = new Date()

    lastMonday.setDate(lastMonday.getDate() - (lastMonday.getDay() + 13) % 14)
    lastMonday.setHours(23, 59, 59)
    
    return lastMonday.getTime()
  }
}

class PreviousMonth extends Timeframe {
  end () {
    const lastMonth = new Date()

    lastMonth.setMonth(lastMonth.getMonth() - 1)
    const lastDayOfMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0)

    lastDayOfMonth.setHours(23, 59, 59)

    return lastDayOfMonth.getTime()
  }

  start () {
    const lastMonth = new Date()

    lastMonth.setMonth(lastMonth.getMonth() - 1)
    lastMonth.setDate(1)
    lastMonth.setHours(0, 0, 0, 0)

    return lastMonth.getTime()
  }
}

export const TimePeriods = new Map([
  [
    TimeframeKeys.FIFTEEN_MIN,
    new Timeframe({
      key: TimeframeKeys.FIFTEEN_MIN,
      timeframeText: 'Last 15 minutes',
      timeframeLength: () => 60 * 15 * 1000
    })
  ],
  [
    TimeframeKeys.ONE_HOUR,
    new Timeframe({
      key: TimeframeKeys.ONE_HOUR,
      timeframeText: 'Last hour',
      timeframeLength: () => 60 * 60 * 1 * 1000
    })
  ],
  [
    TimeframeKeys.THREE_HOUR,
    new Timeframe({
      key: TimeframeKeys.THREE_HOUR,
      timeframeText: 'Last 3 hours',
      timeframeLength: () => 60 * 60 * 3 * 1000
    })
  ],
  [
    TimeframeKeys.SIX_HOUR,
    new Timeframe({
      key: TimeframeKeys.SIX_HOUR,
      timeframeText: 'Last 6 hours',
      timeframeLength: () => 60 * 60 * 6 * 1000
    })
  ],
  [
    TimeframeKeys.TWELVE_HOUR,
    new Timeframe({
      key: TimeframeKeys.TWELVE_HOUR,
      timeframeText: 'Last 12 hours',
      timeframeLength: () => 60 * 60 * 12 * 1000
    })
  ],
  [
    TimeframeKeys.ONE_DAY,
    new Timeframe({
      key: TimeframeKeys.ONE_DAY,
      timeframeText: 'Last 24 hours',
      timeframeLength: () => 60 * 60 * 24 * 1000
    })
  ],
  [
    TimeframeKeys.SEVEN_DAY,
    new Timeframe({
      key: TimeframeKeys.SEVEN_DAY,
      timeframeText: 'Last 7 days',
      timeframeLength: () => 60 * 60 * 24 * 7 * 1000
    })
  ],
  [
    TimeframeKeys.THIRTY_DAY,
    new Timeframe({
      key: TimeframeKeys.THIRTY_DAY,
      timeframeText: 'Last 30 days',
      timeframeLength: () => 60 * 60 * 24 * 30 * 1000
    })
  ],
  [
    TimeframeKeys.CURRENT_WEEK,
    new Timeframe({
      key: TimeframeKeys.CURRENT_WEEK,
      timeframeText: 'This week',
      timeframeLength: () => {
        // Monday -> now
        const prevMonday = new Date()

        prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7)
        prevMonday.setHours(0, 0, 0, 0)

        return (new Date().getTime() - prevMonday.getTime())
      },
    })
  ],
  [
    TimeframeKeys.CURRENT_MONTH,
    new Timeframe({
      key: TimeframeKeys.CURRENT_MONTH,
      timeframeText: 'This month',
      timeframeLength: () => {
        // First of the month -> now
        const firstOfTheMonth = new Date()

        firstOfTheMonth.setDate(1)
        firstOfTheMonth.setHours(0, 0, 0)

        return (new Date().getTime() - firstOfTheMonth.getTime())
      },
    })
  ],
  [
    TimeframeKeys.PREVIOUS_WEEK,
    new PreviousWeek({
      key: TimeframeKeys.PREVIOUS_WEEK,
      timeframeText: 'Previous week',
      timeframeLength: () => 60 * 60 * 24 * 7 * 1000
    })
  ],
  [
    TimeframeKeys.PREVIOUS_MONTH,
    new PreviousMonth({
      key: TimeframeKeys.PREVIOUS_MONTH,
      timeframeText: 'Previous month',
      timeframeLength: () => 60 * 60 * 24 * 30 * 1000
    })
  ]
])
