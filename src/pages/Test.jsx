import React from 'react'
import GoBack from '../components/GoBack';
import EditableTable from '../utility/EditableTable/content/EditableTable';

const Test = () => {
  return (
    <div>
      <GoBack pageTitle="Editable Table" />
      <div className="pt-3">
        <EditableTable />
      </div>
    </div>
  )
}

export default Test
