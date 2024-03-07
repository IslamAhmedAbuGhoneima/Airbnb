import React from 'react'

const FormErrors = ({ errors }) => {
    return (
        <div>
            {
                errors.map((error, index) => {
                    return (
                        <div
                            key={`error_${index}`}
                            className="p-5 mb-2 bg-airbnb text-white rounded-xl opacity-80"
                        >
                            {error}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FormErrors