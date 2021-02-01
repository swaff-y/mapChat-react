import React, {useEffect, useState} from 'react';
import {Avatar} from '@material-ui/core';

const Participant = (props) => {
  return(
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat_info">
        <h2>{ props.participantName}</h2>
        <p>This is the last message</p>
      </div>
    </div>
  )
}

export default Participant;
