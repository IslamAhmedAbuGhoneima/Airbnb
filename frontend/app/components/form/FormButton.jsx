const FormButton = ({ label, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`block w-full mb-2 text-base text-white py-4 px-6 rounded-xl bg-airbnb hover:bg-airbnbDark transition ${className}`}>
            {label}
        </button>
    )
}

export default FormButton;