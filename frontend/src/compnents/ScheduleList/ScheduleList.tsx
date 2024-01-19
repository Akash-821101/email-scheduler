import React from 'react'
import styles from'./ScheduleList.module.css'
import type { Schedule } from '../../types'
import deleteIcon from '../../assets/deleteIcon.svg'
import editIcon from '../../assets/editIcon.svg'

interface ScheduleListProps {
    schedules: Schedule[],
    onEdit: (e: React.MouseEvent<HTMLButtonElement>, id?: string) => void;
    onDelete: (id?: string) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({schedules, onEdit, onDelete}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Subject</th>
          <th>Schedule</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule) => (
          <tr key={schedule.id}>
            <td>{schedule.title}</td>
            <td>{schedule.description}</td>
            <td>{schedule.subject}</td>
            <td>{schedule.frequency} at {schedule.time}</td>
            <td>
              <div className={styles.tableBtn}>
              <button type="button" onClick={(e) => onEdit(e, schedule.id)}><img src={editIcon} alt="deleteIcon" /></button>
              <button type="button" onClick={() => onDelete(schedule.id)}><img src={deleteIcon} alt="editIcon" /></button>
              </div>
              
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ScheduleList