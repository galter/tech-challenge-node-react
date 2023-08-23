import { ReactNode, createContext, useContext, useState } from 'react'

import { api } from '../services/api'

import AsteroidList from '../types/asteroid'

type AsteroidsContextData = {
  fetchAsteroids: (startDate:string, endDate: string) => Promise<void>
  asteroids: AsteroidList | null
  isLoading: boolean
}

type AsteroidsProviderProps = {
  children: ReactNode
}


export const AsteroidsContext = createContext({} as AsteroidsContextData)

export function AsteroidsProvider({children}: AsteroidsProviderProps) {
  const [asteroids, setAsteroids] = useState<AsteroidList | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function fetchAsteroids(startDate: string, endDate: string) {
    setIsLoading(true)
    try {
      const response = await api.get('asteroids', {
        params: {
          startDate,
          endDate
        }
      })

      setAsteroids(response.data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <AsteroidsContext.Provider value={{ asteroids, fetchAsteroids, isLoading }}>
      {children}
    </AsteroidsContext.Provider>
  )
}

export const useAsteroids = () => useContext(AsteroidsContext)