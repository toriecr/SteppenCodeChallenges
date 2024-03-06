import React, { useState } from 'react'

import { Item } from './Item.jsx'
import { AddItem } from './AddItem.jsx'
export const ItemList = () => {
  const [listItems, setListItems] = useState([])

  return (
    <div className="container custom-container">
      <div className="columns is-centered">
        <div className="column is-half-desktop is-full-mobile">
          <div>
            <p className="heading">List</p>
            {listItems?.map((text, index) => {
              return (
                <Item 
                  key={index}
                  index={index} 
                  text={text} 
                  listItems={listItems}
                  setListItems={setListItems} 
                />
              )
            })}
          </div>
          <div style={{paddingBottom: '10px'}}>
            <AddItem 
              setListItems={setListItems}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
