import { useCallback, useEffect } from "react"
import { useAsteroids } from "../contexts/AsteroidsContext"

import AsteroidsList from "./AsteroidsList"
import Heading from "./Heading"
import moment from "moment"

const Main = () => {
  const { asteroids, fetchAsteroids } = useAsteroids()

  const handleFetchAsteroidToday = useCallback(() => {
    const today = moment().format('YYYY-MM-DD')

    fetchAsteroids(today, today)
  }, [fetchAsteroids])

  useEffect(() => {
    if (!asteroids) {
      handleFetchAsteroidToday()
    }
  }, [asteroids, handleFetchAsteroidToday])

	return (
		<>
			<Heading />
      <AsteroidsList />
		</>
	)
}

export default Main