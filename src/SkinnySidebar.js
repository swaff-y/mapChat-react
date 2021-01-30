import React from 'react';
import {IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const SkinnySidebar = (props) => {
  return(
    <div className="skinnySidebar">
      <div className="skinnySidebar_headerRight">
        <IconButton>
          <MoreVertIcon onClick={()=>props.toggleSidebar()}/>
        </IconButton>
      </div>
    </div>
  )
}

export default SkinnySidebar;
