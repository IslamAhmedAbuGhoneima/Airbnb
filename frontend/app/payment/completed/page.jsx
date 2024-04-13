const CompletedPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-24 w-auto" src="/Success.jpg" alt="Logo" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Payment Successful</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <p className="mb-4 text-lg text-gray-800">Thank you for your payment!</p>
                    <p className="mb-4 text-gray-600">Your payment has been successfully processed.</p>
                    <div className="mt-6">
                        <a href="/" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Return Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompletedPage