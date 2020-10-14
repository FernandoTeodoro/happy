import React from 'react'
import { FiPlus } from 'react-icons/fi'
import mapMarkerImg from '../images/map-marker.svg'
import { Link } from 'react-router-dom'
import '../styles/orphanages-map.css'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function OrphanagesMap() {
    return (
        
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt='Happy' />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                
                <footer>
                    <strong>Vitória</strong>
                    <span>Espírito Santo</span>
                </footer>
            </aside>
            
            <Map
                center={[-20.2869448,-40.292304]}
                zoom={13}
                style={{ width: '100%', height: '100%' }} > 

                <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFFFFF" />
            </Link>
        </div>

    )
}

export default OrphanagesMap;