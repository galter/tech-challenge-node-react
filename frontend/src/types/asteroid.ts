type CloseApproachData = {
  miss_distance: {
    kilometers: number
  }
}


export type Asteroid = {
  id: string
  neo_reference_id: string
  name: string
  nasa_jpl_url: string
  absolute_magnitude_h: number
  is_potentially_hazardous_asteroid: boolean
  is_sentry_object: boolean
  estimated_diameter: {
    meters: {
      estimated_diameter_max: number
      estimated_diameter_min: number
    }
  }
  close_approach_data: CloseApproachData[]
  links: {
    self: string
  }
}

export type NearEarthObjects = {
  [date: string]: Asteroid[]
}

type AsteroidList = {
  element_count: number
  near_earth_objects: NearEarthObjects
}

export default AsteroidList