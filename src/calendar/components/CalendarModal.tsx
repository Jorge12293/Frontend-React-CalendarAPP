import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

registerLocale('es',es);

interface FormValues {
  start: Date;
  end: Date;
  title: string;
  notes: string;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const {isDateModalOpen,closeDateModal} = useUiStore();
  const {activeEvent,startSavingEvent}:any = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date,2)
  });

  const titleClass = useMemo(()=>{
    if(!formSubmitted) return '';
    return (formValues.title.length > 0)
      ? 'is-valid'
      : 'is-invalid';
      
  },[formValues.title,formSubmitted])

  useEffect(() => {
    if(activeEvent !== null){
      setFormValues({...activeEvent})
    }
  }, [activeEvent])
  

  const onInputChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const onDateChanged = (event: Date | null, changing: 'start' | 'end') => {
    if (event) {
      setFormValues({
        ...formValues,
        [changing]: event,
      });
    }
  };

  const onCloseModal = () => {
    closeDateModal()
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end,formValues.start);
    if(isNaN(difference) || difference <=0 ){
      console.log("Error in dates")
      Swal.fire('Error Dates','Error in dates','error')
      return;
    }
    if(formValues.title.trim().length<=0) return;
    console.log(formValues)
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-background"
      closeTimeoutMS={200}>
      <h1> New Event</h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <label>Date and hour start</label><br />
          <DatePicker 
            selected={formValues.start}
            onChange={(event)=>onDateChanged(event,'start')} 
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Time"/>
        </div>

        <div className="form-group mb-2">
          <label>Date and hour end</label><br />
          <DatePicker 
            minDate={formValues.end}
            selected={formValues.end}
            onChange={(event)=>onDateChanged(event,'end')} 
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"/>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Title and Notes</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Title of event"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">Short description</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notes"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Information Additional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  )
}
