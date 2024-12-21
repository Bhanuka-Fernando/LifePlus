import React from 'react';
import PeakTimesDashboard from '../../components/Banuka/PeakTimesDashboard/PeakTimesDashboard';
import Sidebar from '../../components/Banuka/SideBarComponent/Sidebar';



function ReportPage() {
    return(
        <div style={{display:'flex'}}>
        <div>
      <Sidebar />
      </div>
      <div style={{flexGrow:1}}>
      <PeakTimesDashboard/>
      </div>
    </div>
    )
}

export default ReportPage;