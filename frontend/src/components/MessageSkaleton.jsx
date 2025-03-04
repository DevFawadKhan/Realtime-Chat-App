function MessageSkaleton() {
  return (
    <div className="p-4 space-y-4 w-full bg-black h-screen flex flex-col">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
      >
        <div className="flex items-center space-x-2">
          {index % 2 === 0 && (
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
          )}
          <div className="bg-gray-800 animate-pulse p-4 rounded-lg w-40 h-6"></div>
          {index % 2 !== 0 && (
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>
    ))}
  </div>
  )
}

export default MessageSkaleton
