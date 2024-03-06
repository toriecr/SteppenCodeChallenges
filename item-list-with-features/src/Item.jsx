import React, { useState, useEffect, useRef } from 'react'

export const Item = (props) => {
  const { text, index, listItems, setListItems } = props
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newItem, setNewItem] = useState(text)
  const inputRef = useRef(null)

  // Automatically focus on element currently editing
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing])

  useEffect(() => {
    setNewItem(text)
  }, [text])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdateItem()
      setIsEditing(false)
    }
  }

  const handleOnBlur = () => {
    handleUpdateItem()
    setIsEditing(false)
  }

  const handleUpdateItem = () => {
    if (newItem.trim() !== '') {
      const updatedItems = [...listItems]
      updatedItems[index] = newItem
      setListItems(updatedItems)
      setNewItem(newItem)
    }
  }

  const handleDeleteItem = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?')
    if (isConfirmed) {
      const updatedItems = [...listItems]
      updatedItems.splice(index, 1)
      setListItems(updatedItems)
      setNewItem(newItem)
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`card ${isHovered ? 'hovered' : ''}`}
      style={{position: 'relative'}}
    >
      <div className="card-content">
        {isHovered && !isEditing && (
          <div className="buttons is-flex-direction-column" style={{ position: 'absolute', top: 0, left: 0, }}>
            <button className="button is-small is-info" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="button is-small is-danger" onClick={handleDeleteItem}>
              Delete
            </button>
          </div>
        )}
        {isEditing ?
          <input
            ref={inputRef}
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleOnBlur}
            className="input custom-input"
            placeholder={newItem}
          />
          :
          <p>{newItem}</p>
        }
      </div>
    </div>
  )
}
