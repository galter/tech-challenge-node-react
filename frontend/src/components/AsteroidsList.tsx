import { useAsteroids } from "../contexts/AsteroidsContext"

import { Asteroid } from "../types/asteroid"
import AsteroidCard from "./AsteroidCard"

const AsteroidsList = () => {
  const { asteroids, isLoading } = useAsteroids()

  if (!asteroids || !asteroids.near_earth_objects) {
    return <div className="flex p-10 justify-center items-center">No asteroids data available.</div>
  }

  if (isLoading) {
    return <div className="flex p-10 justify-center items-center">Loading asteroids...</div>
  }

  if (asteroids) {
    const allAsteroids = Object.values(asteroids.near_earth_objects)

    // Flatten the arrays into a single array
    const flattenedAsteroids = allAsteroids.reduce((acc: Asteroid[], curr: Asteroid[]) => {
      return acc.concat(curr);
    }, [])

    // Sort by name
    const sortedAsteroids = flattenedAsteroids.sort((a: Asteroid, b: Asteroid) => {
      return a.name.localeCompare(b.name);
    });

    return (
      <div className="flex p-10 items-center justify-center">
        <div className="grid grid-cols-3 gap-8">
          {sortedAsteroids.map((asteroid: Asteroid) => (
            <AsteroidCard key={asteroid.id} asteroid={asteroid}  />
          ))}
        </div>
      </div>
    )
  }
}

export default AsteroidsList