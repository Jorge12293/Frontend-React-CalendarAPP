import { EventCalendar } from "../interfaces/EventCalendar";

interface Props {
    event:EventCalendar
}
export const CalendarEvent = ({ event }: Props) => {
    const { title, user } = event;   
    return (
       <>
           <strong>{title}</strong>
           <span>- {user.name}</span> 
       </>
    )
}
