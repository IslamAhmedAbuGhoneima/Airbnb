const Model = ({ label, content, isOpen, closed }) => {
    return (
        <>
            {
                isOpen &&
                <div className="flex items-center justify-center fixed inset-0 bg-black/60 z-50">
                    <div className="w-[90%] md:w-[80%] lg:w-[700px] my-6 mx-auto h-auto">
                        <div className={`translate duration-600 h-full ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-10'}`}>
                            <div className="w-full h-auto rounded-xl flex flex-col bg-white">
                                <header className="relative p-3 flex items-center justify-center border-b">
                                    <h1 className="text-lg font-bold">{label}</h1>
                                    <span onClick={closed} className="absolute w-[20px] h-[20px] -top-3.5 right-1 bg-red-500 hover:bg-red-300 rounded-full text-white p-3 flex items-center justify-center cursor-pointer">
                                        X
                                    </span>
                                </header>
                                <section className="p-3">
                                    {content}
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default Model