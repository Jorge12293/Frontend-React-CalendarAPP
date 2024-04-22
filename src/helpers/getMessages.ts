export const getMessagesES = () => {
    return {
        allDay: 'Every all day',
        previous: '<',
        next: '>',
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        agenda: 'Agenda',
        date: 'Date',
        time: 'Hour',
        event: 'Event',
        noEventsInRange: 'The are no events in this range',
        showMore: (total: any) => `+ See more (${total})`
    }
}