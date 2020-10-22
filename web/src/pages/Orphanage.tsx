import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import {FiClock, FiInfo } from 'react-icons/fi'
import { Map, Marker, TileLayer} from "react-leaflet"
import L from 'leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import '../styles/orphanages.css'
import Sidebar from '../components/Sidebar'

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function Orphanage() {
  
  return(
    <div id="page-orphanage">
      
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das Meninas" />

          <div className="images">
            <button className="active" type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das Meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das Meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das Meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das Meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das Meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das Meninas" />
            </button>
            </div>

            <div className="orphanage-details-content">
              <h1>Lar das Meninas</h1>
              <p>Algum texto aleatório só pra dizer que tem algo aqui e que depois vai ser substituido pelo que tem dentro do campo about do objeto orphanage</p>

              <div className="map-container">
                <Map
                  center={[-20.2873611,-40.3080731]}
                  zoom={16}
                  style={{ width: '100%', height: 280}}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />
                  <Marker interactive={false} icon={happyMapIcon} position={[-20.2873611,-40.3080731]}/>
                </Map>

                <footer>
                  <a href="">Ver as rotas no Google Maps</a>
                </footer>
              </div>

              <hr />

              <h2>Instruções para Visita</h2>
              <p>Venha como se sentir à vontade e traga muito amor pra dar.</p>

              <div className="open-details">
                <div className="hour">
                  <FiClock size={23} color="#15B6D6" />
                  Segunda à Sexta <br/>
                  8h às 18h
                </div>
                <div className="open-on-weekends">
                  <FiInfo size={23} color="#39CC83" />
                  Atendemos <br/>
                  fim de semana
                </div>
              </div>

              <button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFFFFF" />
                Entrar em Contato
              </button>  
            </div>
          </div>
      </main>
    </div>
  );
}