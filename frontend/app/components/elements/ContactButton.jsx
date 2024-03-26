import React from 'react'

const ContactButton = ({ email }) => {
    return (
        <a
            href={`mailto:${email}`}
            className="text-base text-white py-4 px-6 rounded-xl bg-airbnb hover:bg-airbnbDark transition">
            Contact
        </a>
    )
}

export default ContactButton;