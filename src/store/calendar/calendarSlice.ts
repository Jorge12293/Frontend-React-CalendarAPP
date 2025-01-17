import { createSlice } from "@reduxjs/toolkit";
import { EventCalendar } from "../../calendar/interfaces/EventCalendar";

interface CalendarState {
    events: EventCalendar[],
    activeEvent: EventCalendar | null
}

const initialState: CalendarState = {
    events: [],
    activeEvent: null
}

export const calendarSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event._id === payload._id) {
                    return payload;
                }
                return event;
            })
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent?._id)
                state.activeEvent = null;
            }
        }
    }
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;