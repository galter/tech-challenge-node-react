import { MouseEvent, useCallback, useState } from "react"
import { Asteroid } from "../types/asteroid"
import { FaMeteor } from "react-icons/fa"

type AsteroidCardProps = {
  asteroid: Asteroid
}

const AsteroidCard: React.FC<AsteroidCardProps> = ({ asteroid }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleOpenModal = useCallback(() => {
    setShowModal(true)
  }, [])

  const handleCancel = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false)
    }
  }

  const stopPropagation = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, [])
    
	return (
		<div
      className="flex flex-row gap-4 py-6 px-6 bg-slate-100 h-40 cursor-pointer rounded-md"
      onClick={handleOpenModal}
    >
      <FaMeteor size={48} className={`${asteroid.is_potentially_hazardous_asteroid ? 'text-red-400': 'text-slate-400'} mr-2`}/>
      <div className="flex flex-col gap-1">
        <h2 className="flex justify-start">
          {asteroid.name}
        </h2>
        <p className="flex justify-start text-xs"> ID: {asteroid.id}</p>
        <p className="flex justify-start text-xs"> HAZARD: {asteroid.is_potentially_hazardous_asteroid ? "YES" : "NO"}</p>
        <p className="flex justify-start text-xs"> Ø {Math.round((asteroid.estimated_diameter.meters.estimated_diameter_max + asteroid.estimated_diameter.meters.estimated_diameter_min) / 2) } M</p>
        <p className="flex justify-start text-xs"> ↔ {Math.round(asteroid.close_approach_data[0].miss_distance.kilometers)} KM</p>
      </div>

      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={handleCancel}
            />

            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg" onClick={stopPropagation}>
                <div className="flex items-center justify-center flex-none w-14 h-14 mx-auto bg-red-100 rounded-full">
                  <FaMeteor size={48} className="text-red-400"/>
                </div>
                
                <div className="mt-3 sm:flex justify-center items-center w-full">
                  <div className="mt-2 text-center items-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800">
                      {asteroid.name}
                    </h4>

                    <p className="text-xs text-gray-500">ID: {asteroid.id}</p>
                    <p className="text-xs text-gray-500">HAZARD: {asteroid.is_potentially_hazardous_asteroid ? "YES" : "NO"}</p>
                    <p className="text-xs text-gray-500">SENTRY OBJECT: {asteroid.is_sentry_object ? "YES" : "NO"}</p>
                    <p className="text-xs text-gray-500">ABSOLUTE MAGNITUDE: {asteroid.absolute_magnitude_h}</p>
                    <p className="text-xs text-gray-500"> Ø {Math.round((asteroid.estimated_diameter.meters.estimated_diameter_max + asteroid.estimated_diameter.meters.estimated_diameter_min) / 2) } M</p>
                    <p className="text-xs text-gray-500"> ↔ {Math.round(asteroid.close_approach_data[0].miss_distance.kilometers)} KM</p>
                    <p className="flex mt-2 text-xs text-gray-500">{asteroid.nasa_jpl_url}</p>
                    <a className="w-full mt-2 text-xs text-gray-500" href={asteroid.links.self} target="_blank">
                    <p className="flex mt-2 text-xs text-gray-500">{asteroid.links.self}</p>
                    </a>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={handleCancel}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
		</div>
	)
}

export default AsteroidCard