// "use client";
const EmailConfirmationPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
                <h2 className="text-3xl font-bold mb-4 text-center">Confirm Your Email</h2>
                <p className="text-gray-600 mb-6 text-center">
                    We've sent a confirmation email to your inbox. Please click on the confirmation link to activate your account.
                </p>
                {/* <div className="flex justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Resend Email
                    </button>
                </div> */}
            </div>
        </div>

    )
}

export default EmailConfirmationPage