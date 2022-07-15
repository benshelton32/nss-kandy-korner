import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
            .then(response => response.json())
            .then((locationArray) => {
                setLocations(locationArray)
            })
        },
        []
    )

    return <>
        <h2>Locations</h2>

        <article className="locations">
            {
                locations.map(location => {
                    return <>
                        <section className="location">
                            <header className="locationCity">{location.city}</header>
                            <footer className="locationAttributes">
                                <div>{location.address}</div>
                                <div>{location.squareFootage} sq feet</div>
                            </footer>
                        </section>
                    </>
                })
            }
        </article>
    </>

}