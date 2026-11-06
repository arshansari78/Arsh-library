export default function Input({ id, text, icon = "@", error, isError = false, ...rest }) {
    return (
        <div className="mb-4">
            {isError && (
                <p className="text-red-500 text-xs mb-1">{error}</p>
            )}

            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    {icon}
                </div>
                <input
                    id={id}
                    {...rest}
                    placeholder={text}
                    className="bg-white ps-10 block py-2.5 px-3 w-full hover:shadow-xl border rounded-lg focus:outline-none focus:ring-1"
                />
            </div>
        </div>
    )
}