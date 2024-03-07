const FormButton = ({ label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="text-base text-white py-4 px-6 rounded-xl bg-airbnb hover:bg-airbnbDark transition">
            {label}
        </button>
    )
}

export default FormButton;