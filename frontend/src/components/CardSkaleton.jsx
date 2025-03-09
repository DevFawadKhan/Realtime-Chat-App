function CardSkaleton() {
  return (
    <>
 <div  className="mt-5 pl-2 flex items-center h-[75px] bg-cover shadow-2xl animate-pulse">
      <img className="w-[60px] h-[60px] bg-gray-300 rounded-full" src={null} alt={null} />
      <div className="ml-3 flex flex-col w-full space-y-4">
        <h1 className="font-bold  bg-gray-300 text-transparent">{"hello"}</h1>
        <p className="bg-gray-300 text-transparent ">{"heeloo"}</p>
      </div>
    </div>
    </>
  )
}

export default CardSkaleton