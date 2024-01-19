import './App.css'
import SearchBox from './compnents/SearchBox/SearchBox'
import axios from './axios'
import { useEffect, useState, useRef } from 'react'
import ScheduleList from './compnents/ScheduleList/ScheduleList'
import ScheduleForm from './compnents/ScheduleForm/ScheduleForm'
import type { Schedule } from './types'

const App: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [term, setTerm] = useState<string>('');
  const [showForm, setShowForm] = useState(false)
  const [scheduleId, setScheduleId] = useState<string|null>(null)
  const formStyle = useRef({});
  const dashboardRef = useRef<HTMLDivElement>(null);

  // fetch sechudle list of from api end-point
  const fetchSchedules = async (term: string='') => {
    try {
      const res = await axios.get(`/schedules?title=${term}`)
      setSchedules(res.data);
      //setFilteredSchedules(res.data)
      
    } catch (error) {
      console.log('could fetch data', error)
    }
  }

  const addNew = () => {
    formStyle.current = {}
    setScheduleId(null);
    setShowForm(true);
  }

  const handleOnSave = () => {
    fetchSchedules();
    setShowForm(false);
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => {
    const pos = dashboardRef.current?.getBoundingClientRect();
    if(pos){
      formStyle.current = {
        right: `${(pos.right - e.clientX) - 30}px`,
        top: `${(e.clientY  - pos.y) - 30 }px`
      }
    }
    if(id){
      setScheduleId(id);
      setShowForm(true);
    }
  };

  const handleDelete =  async (id: string | undefined) => {
    try {
       await axios.delete(`/schedules/${id}`)
      await fetchSchedules();
    } catch (error) {
      console.log('could not delete', error)
    }
  }

  const popoverForm = showForm && <ScheduleForm scheduleId={scheduleId} onCancel={() => setShowForm(false)} onSave={handleOnSave} style={formStyle.current}/>

  // load the data when component mount
  useEffect(()=> {
    fetchSchedules(term);
  },[term])

  return (
    <>
      <div className='app'>
        <div className="header"></div>
        <div className="container">
        <div className="nav"></div>
        <div className="dashboard" ref={dashboardRef}>
          {/* display list of component  */}
          <div className='dashboardSearch-fields'>
            <SearchBox onSearch={(term) => setTerm(term)}/>
            <button className='btn' onClick={addNew}>
            <svg style={{width: '20px', height: '20px'}}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="add"><g fill="#fff"><path d="M32 55.9C18.8 55.9 8.1 45.2 8.1 32S18.8 8.1 32 8.1 55.9 18.8 55.9 32 45.2 55.9 32 55.9zm0-45.2c-11.7 0-21.3 9.6-21.3 21.3S20.3 53.3 32 53.3 53.3 43.7 53.3 32 43.7 10.7 32 10.7z"></path><path d="M19.3 30.6h25.4v2.8H19.3z"></path><path d="M30.6 19.3h2.8v25.4h-2.8z"></path></g></svg>
               <span>Add</span></button>
            {popoverForm}

          </div> 
          <ScheduleList schedules={schedules} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>
        </div>
       
      </div>
    </>
  )
}

export default App
