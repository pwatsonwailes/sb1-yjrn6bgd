import React from 'react'

const SaveGameStateButton = ({ Text, State, onClick = null }) => {
  const handleSaveGame = () => {
    const output = window.electron.store.set('gameState', State)
    console.log('Game state saved:', State, output)

    if (typeof onClick === 'function')
      onClick()
  }

  return <button onClick={handleSaveGame}>{Text}</button>
}

export default SaveGameStateButton