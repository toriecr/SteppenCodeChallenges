import React, { useState } from 'react'

export const AddItem = (props) => {
  const { setListItems } = props
  const [newItem, setNewItem] = useState('')

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setListItems((items) => [...items, newItem])
      setNewItem('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddItem()
    }
  }

  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input"
          placeholder="Enter new item"
        />
      </div>
      <div className="control">
        <button className="button is-primary" onClick={handleAddItem}>
          Add
        </button>
      </div>
    </div>
  )
}
