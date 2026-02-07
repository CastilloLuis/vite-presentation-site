import React from 'react'
import QuestItem from './QuestItem'
import { quests } from '../data/gameData'

const QuestList = () => {
    return (
        <div className="quest-list-section">
            <h2 className="section-title">Current Quests</h2>
            <div className="quest-list">
                {quests.map((quest, i) => (
                    <QuestItem key={quest.name} quest={quest} index={i} />
                ))}
            </div>
        </div>
    )
}

export default QuestList
