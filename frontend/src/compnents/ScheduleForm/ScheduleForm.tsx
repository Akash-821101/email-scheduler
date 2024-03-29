import React, { useState, useEffect } from 'react';
import axios from '../../axios'
import styles from './ScheduleForm.module.css'
import type {Schedule} from '../../types'
import DaysRepeat from '../DaysRepeat/DaysRepeat';
import Button from '../Button/Button';
interface ScheduleFormProps {
  scheduleId: string | null; 
  style: React.CSSProperties
  onCancel: () => void;
  onSave: (data: Schedule) => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({  scheduleId , style, onCancel, onSave  }) => {
  const [formData, setFormData] = useState<Schedule>({
    title: '',
    description: '',
    subject: '',
    frequency: 'Daily',
    repeat: '',
    time: '10:00AM',
  });

  const [inValidField, setInValidField] = useState<string []>([])

  const [formDayRepeat, setFormDayRepeat] = useState<number[]>([]);

  useEffect(() => {
    // Fetch schedule details if editing an existing schedule
    if (scheduleId) {
      fetchScheduleDetails(scheduleId);
    }
  }, [scheduleId]);

  const fetchScheduleDetails = async (scheduleId: string) => {
    try {
      const res = await axios.get(`/schedules/${scheduleId}`);
      setFormData(res.data);
      if(res.data.frequency === 'Weekly'){
        setFormDayRepeat(res.data.repeat.split(',').map((item: string) => parseInt(item)))
      }
    } catch (error) {
      console.log('Could not fetch schedule details', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
 
  const handleSubmit = async () => {
    try {

      if(formData.frequency === 'Weekly'){
        formData.repeat = formDayRepeat.join(',');
      }

      if(!validateForm({...formData})){
        return false;
      }

      if (scheduleId) {
        // Update existing schedule
        await axios.put(`/schedules/${scheduleId}`, formData);
      } else {
        // Create new schedule
        await axios.post('/schedules', formData);
      }
      

      onSave(formData);

      // Reset form data and trigger onSuccess callback
      setFormData({
        title: '',
        description: '',
        subject: '',
        frequency: 'Daily',
        repeat: '',
        time: '',
      });
    } catch (error) {
      console.log('Error submitting schedule form', error);
    }
  };

  const handleDayRepeatChange = (data: number[]) => {
    setFormDayRepeat(data);
  };

  const validateForm = (formData: {[key: string]: string}) => {
    setInValidField([]);
    const errorFields = [];
    for(const data in formData) {
      if(formData[data] === ''){
        if(data === 'repeat'){
          if(formData.frequency !== 'Daily'){
            errorFields.push(data);
          }
        }else{
          errorFields.push(data);
        }
      }
    }
    setInValidField(errorFields);
    if(errorFields.length > 0){
      return false;
    }

    return true;

  
  }


  return (
    <div className={styles.formContainer} style={style}>
      <h2>{scheduleId ? 'Edit Schedule' : 'Add Schedule'}</h2>
      <div className={styles.formGroup}>
      <label htmlFor='title'>
          Title
        </label>
      <input className={styles.inputBox}  type="text" id='title' name="title" value={formData.title} onChange={handleInputChange} />
      </div>
      {inValidField.includes('title') && <div className={styles.errorWrapper}>Please fill title</div> }

        <div className={styles.formGroup}>
        <label htmlFor='description'>
          Description
        </label>
        <input className={styles.inputDesc}  type="text" id='description' name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        {inValidField.includes('description') && <div className={styles.errorWrapper}>Please fill description</div> }

        <div className={styles.formGroup}>
        <label htmlFor='subject'>
          Subject
        </label>
        <input className={styles.inputBox}  type="text" id='subject' name="subject" value={formData.subject} onChange={handleInputChange} />
        </div>
        {inValidField.includes('subject') && <div className={styles.errorWrapper}>Please fill subject</div> }

        <div className={styles.formGroup}>
        <label htmlFor='frequency'>
          Frequency
          
        </label>
        <select className={styles.inputBox}  name="frequency" id='frequency' value={formData.frequency} onChange={handleInputChange}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        
        {formData.frequency === 'Weekly' && (
          <div className={styles.formGroup}>
            <label>
            Repeat
          </label>
          <div>
          <DaysRepeat data={formDayRepeat} onChange={handleDayRepeatChange}/>
          </div>
          </div>
          
          
        )}

        {formData.frequency === 'Monthly' && (
          <div className={styles.formGroup}>
          <label htmlFor='repeat'>
            Repeat
           
          </label>
          <div>
          <select className={styles.inputBox}  name="repeat" id='repeat' value={formData.repeat} onChange={handleInputChange}>
              <option value="firstMonday">First Monday</option>
              <option value="lastFriday">Last Friday</option>
            </select>
            </div>
          </div>
          
        )}

      <div className={styles.formGroup}>
      <label htmlFor='time'>
          Time
        </label>
        <select className={styles.inputBox}  name="time" id='time' value={formData.time} onChange={handleInputChange}>
            <option value="10:00AM">10:00AM</option>
            <option value="11:00AM">11:00AM</option>
            <option value="12:00PM">12:00PM</option>
          </select>
      </div>
      {inValidField.includes('time') && <div className={styles.errorWrapper}>Please fill time</div> }

        <div className={styles.formBtn}>
          <Button variant="primary" onClick={onCancel}>Cancel</Button>
          <Button variant="secondary" onClick={handleSubmit}>{scheduleId ? 'Update' : 'Create'}</Button>
        </div>
        <div className={styles.errorWrapper}>

        </div>
    </div>
  );
};

export default ScheduleForm;

