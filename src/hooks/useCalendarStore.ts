import { EventCalendar } from "../calendar/interfaces/EventCalendar";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useCalendarStore = () => {
    const dispatch = useAppDispatch();
    const { events, activeEvent } = useAppSelector(state => state.calendar);

    const setActiveEvent = (eventCalendar: EventCalendar) => {
        dispatch(onSetActiveEvent(eventCalendar))
    }

    const startSavingEvent = async (eventCalendar: EventCalendar) => {
        // TODO: SEND TO BACKEND
        if (eventCalendar._id) {
            // Update Event
            dispatch(onUpdateEvent({ ...eventCalendar }))
        } else {
            // Create Event
            dispatch(onAddNewEvent({ ...eventCalendar, _id: new Date().getTime() }))
        }
    }


    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {
        //* Properties
        activeEvent,
        events,
        hasEventSelected:!!activeEvent,
        //* Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}