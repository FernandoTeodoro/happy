import React, { useEffect } from 'react'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import  Leaflet from 'leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import '../styles/orphanages-map.css'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

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

        <Marker 
            icon={mapIcon}
            position={[-20.2872657,-40.306196]}
        >
          <Popup className="map-popup" closeButton={false} minWidth={240} maxWidth={240}>
            Lar das Meninas

            <Link to="/orphanages/1">
              <FiArrowRight size={20} color="#FFFFFF"/>
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFFFFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap;