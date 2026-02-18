import React from 'react'
import { motion } from 'framer-motion'
import { socialLinks } from '../../data/gameData'

export default function ContactModal() {
  return (
    <div className="modal-contact">
      <p className="modal-contact-intro">
        Want to connect? Find me on these platforms:
      </p>

      <div className="modal-contact-links">
        {socialLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`https://cdn.simpleicons.org/${link.slug}/white`}
              alt={link.name}
              className="contact-link-icon"
              draggable={false}
            />
            <span className="contact-link-name">{link.name}</span>
            <span className="contact-link-arrow">→</span>
          </motion.a>
        ))}
      </div>

      <div className="modal-contact-footer">
        <p>Feel free to reach out for collaborations, opportunities, or just to say hi!</p>
      </div>
    </div>
  )
}
