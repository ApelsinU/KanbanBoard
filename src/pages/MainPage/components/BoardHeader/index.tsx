import './board-header.scss'
import React from 'react'

import { IDataCards } from '../Board/DataCards'

interface IBoardHeaderProps {
  dataCards: IDataCards | null
}

export const BoardHeader = ({ dataCards }: IBoardHeaderProps) => {
  return (
    <div className="board-header">
      {dataCards &&
        Object.entries(dataCards).map((card, index) => (
          <div key={index} className="col">
            <div className="col-header-text">
              <span>
                {card[0]}
                <div className="col-header-count">
                  <span>{card[1].length}</span>
                </div>
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}
