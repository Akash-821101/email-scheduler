import React from 'react'
import styles from './DaysRepeat.module.css'

interface DaysRepeatProps {
    onChange: (selectedDay: number[]) => void;
    data: number[];
}

const DaysRepeat: React.FC<DaysRepeatProps> = ({onChange, data}) => {
    
    const handleDayClick = (day: number) => {
        let allSelectedDays = [...data];
       const isSelected = allSelectedDays.includes(day);
        if(isSelected) {
            allSelectedDays = allSelectedDays.filter((d) => d != day);
        } else {
            allSelectedDays = [...allSelectedDays, day];
        }
        onChange(allSelectedDays);
    }

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  return (
    <div className={styles.daysWrapper}>
        {days.map((day, index) => 
        <div style={{background: data.includes(index) ? 'lightblue' : 'white'}} onClick={() => handleDayClick(index)} key={`${day}-${index}`} className={styles.daysBox}>{day} </div>
        )}
    </div>
  )
}

export default DaysRepeat