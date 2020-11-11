import React, { useEffect, useState } from 'react'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import  Leaflet from 'leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import '../styles/orphanages-map.css'
import api from '../services/api'
import Orphanage from './Orphanage'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);
  
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
        center={[-20.2715501,-40.3231287]}
        zoom={13}
        style={{ width: '100%', height: '100%' }} > 

        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map(orphanage => {
            return(
              <Marker 
                  key={orphanage.id}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
              >
                <Popup className="map-popup" closeButton={false} minWidth={240} maxWidth={240}>
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#FFFFFF"/>
                  </Link>
                </Popup>
              </Marker>
            )
          })
        }
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFFFFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap;