import React, {useEffect, useState} from 'react';
import {Avatar} from '@material-ui/core';

const Participant = ({participant}) => {

  return(
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat_info">
        <h2>{ participant.name }</h2>
        <p>{ participant.lastMessage }</p>
      </div>
    </div>
  )
}

export default Participant;
