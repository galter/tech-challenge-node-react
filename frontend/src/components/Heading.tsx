import { useState } from "react"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"
import { useAsteroids } from "../contexts/AsteroidsContext"

const Heading = () => {
  const [datesValue, setDatesValue] = useState<DateValueType>({ 
    startDate: new Date(), 
    endDate: new Date()
  })

  const { fetchAsteroids, isLoading } = useAsteroids()

  const handleDateValuesChange = (newValue: DateValueType) => {
    setDatesValue(newValue)
  }

  const handleFecthAsteroids = () => {
    if (datesValue?.startDate && datesValue.endDate) {
      fetchAsteroids(datesValue.startDate?.toString(), datesValue.endDate?.toString())
    }
  }

	return (
    <div className="w-full p-10 bg-slate-900 h-50">
      <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-slate-100">Tech challenge</h1>
          <p className="text-lg text-slate-100">Cicero Oliveira - Meteor ReactJS+NodeJS</p>

          <div className="w-1/2 mt-4 flex flex-row items-center justify-center">
            <button 
              className="w-full mx-4 px-6 py-2 text-center text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-800"
              onClick={handleFecthAsteroids}
            >
                {isLoading ? "Loading..." : "Search meteors"}
            </button>

            <Datepicker
              value={datesValue}
              onChange={handleDateValuesChange}
            />
          </div>
      </div>
    </div>
	)
}

export default Heading