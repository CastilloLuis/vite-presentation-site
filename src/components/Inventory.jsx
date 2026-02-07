import React from 'react'
import InventorySlot from './InventorySlot'
import { inventoryItems, TOTAL_INVENTORY_SLOTS } from '../data/gameData'

const Inventory = ({ onSeeSkills }) => {
    const emptyCount = TOTAL_INVENTORY_SLOTS - inventoryItems.length

    return (
        <div className="inventory-section">
            <h2 className="section-title">Inventory</h2>
            <div className="inventory-grid">
                {inventoryItems.map((item, i) => (
                    <InventorySlot key={i} item={item} />
                ))}
                {emptyCount > 0 && (
                    <button
                        className="mc-slot see-skills-btn"
                        style={{ gridColumn: `span ${Math.min(emptyCount, 9)}` }}
                        onClick={onSeeSkills}
                    >
                        See Skills →
                    </button>
                )}
            </div>
        </div>
    )
}

export default Inventory
