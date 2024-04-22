import { Calendar, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, Navbar } from "../"
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { EventCalendar } from '../interfaces/EventCalendar';


export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView] = useState<View>(
    localStorage.getItem('lastView') as View || 'week'
  );

  const eventStyleGetter = (
    eventCalendar: EventCalendar,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = (eventCalendar: EventCalendar) => {
    console.log({ doubleClick: eventCalendar })
    openDateModal();
  }
  const onSelect = (eventCalendar: EventCalendar) => {
    console.log({ click: eventCalendar })
    setActiveEvent(eventCalendar)
  }
  const onViewChanged = (view: View) => {
    console.log(view)
    localStorage.setItem('lastView', view)
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
