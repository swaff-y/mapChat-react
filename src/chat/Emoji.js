import React, {useEffect, useState} from 'react';
import Picker from 'emoji-picker-react';

const Emoji = (props) => {

  const onEmojiClick = (event, emojiObject) => {
    props.getEmoji(emojiObject);
    props.handleToggle();
  };

  return(
    <div>
       <Picker onEmojiClick={onEmojiClick} />
    </div>
  )
}

export default Emoji;

// {chosenEmoji ? (
//   <span>You chose: {chosenEmoji.emoji}</span>
// ) : (
//   <span>No emoji Chosen</span>
// )}
