import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabDelete = () => {  
  const {startDeletingEvent,hasEventSelected} = useCalendarStore();

  const handleClickDelete =()=>{
    startDeletingEvent();
  }
  
  return (
    <button 
        onClick={handleClickDelete}
        className="btn btn-danger fab fab-trash"
        style={{
          display:hasEventSelected?'':'none'
        }}>
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}

