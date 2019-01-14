import React from 'react'

const MusicItem = ({ title, src }) => {
  return (
    <div>
      <img src={src} alt="성공!">
        {title}
      </img>
    </div>
  )
}

export default MusicItem
