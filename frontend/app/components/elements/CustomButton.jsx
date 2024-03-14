const CustomButton = ({ label }) => {
    return (
        <button
            className="text-base text-white py-4 px-6 rounded-xl bg-airbnb hover:bg-airbnbDark transition">
            {label}
        </button>
    )
}

export default CustomButton;