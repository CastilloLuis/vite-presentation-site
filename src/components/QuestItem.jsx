import React from 'react'
import { motion } from 'framer-motion'

const QuestItem = ({ quest, index = 0 }) => {
    const isCompleted = quest.status === 'completed'

    return (
        <div
            className="quest-item"
            style={{
                borderLeftColor: quest.color,
                opacity: quest.progress < 20 ? 0.75 : 1,
            }}
        >
            <p className="quest-name" style={{ color: quest.color }}>
                {quest.name}
            </p>
            <p className="quest-status">
                {isCompleted ? 'COMPLETED' : `Progress: ${quest.progress}%`}
            </p>
            <div className="quest-bar-track">
                <motion.div
                    className="quest-bar-fill"
                    style={{ backgroundColor: quest.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${quest.progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 + index * 0.15 }}
                />
            </div>
        </div>
    )
}

export default QuestItem
