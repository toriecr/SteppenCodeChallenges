import React, { useState } from 'react'

export const TwoPaneList = ({ data }) => {
  const [selectedTitle, setSelectedTitle] = useState(null)

  return (
    <div className="columns">
      <div className="column is-one-third">
        <aside className="menu">
          <p className="menu-label">Titles</p>
          <ul className="menu-list">
            {data.map((item, index) => (
              <li
                key={index}
                onClick={() => setSelectedTitle(index)}
                className={selectedTitle === index ? 'is-active' : ''}
              >
                <a>{item.title}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <div className="column">
        <div className={`box ${selectedTitle !== null ? 'content-animation' : ''}`}>
          {selectedTitle === null ? (
            <p>Click on a title to view content.</p>
          ) : (
            <>
              <h2 className="title is-4">{data[selectedTitle].title}</h2>
              {data[selectedTitle].content.map((paragraph, index) => (
                <p key={index} className={index !== 0 ? 'paragraph-spacing' : ''}>
                  {index === 0 ? <strong>{paragraph}</strong> : paragraph}
                </p>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
