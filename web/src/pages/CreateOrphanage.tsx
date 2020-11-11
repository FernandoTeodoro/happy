import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { FiPlus } from 'react-icons/fi'
import { LeafletMouseEvent } from 'leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import '../styles/create-orphanage.css'
import Sidebar from '../components/Sidebar'
import api from '../services/api'
import { useHistory } from 'react-router-dom'

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function OrphanagesMap() {

  const [position, setPosition] = useState({latitude: 0, longitude: 0})
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState ('');
  const [open_on_weekend, setOpenOnWeekend] = useState (true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const history = useHistory();

  function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const {latitude, longitude} = position;

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekend', String(open_on_weekend));
    
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data);

    alert('Cadastro Realizado Com Sucesso!');

    history.push('/app');
  }

  return(
    <div id="page-create-orphanage">
      
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-20.2715501,-40.3231287]}
              zoom={13}
              style={{ width: '100%', height: 280 }}
              onclick={handleMapClick}
            > 

              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />

            { position.latitude !== 0 && (
                <Marker 
                interactive={false} 
                icon={happyMapIcon} 
                position={[position.latitude, position.longitude]} />
            )}
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}  
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                maxLength={300} 
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return(
                    <img key={image} src={image} alt={name} />
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15B6D6" />
                </label>
              </div>
                
              <input className="input-image" multiple onChange={handleSelectImages} type="file" id="image[]"/>
              
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions}
                onChange={event =>  setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input
                id="opening-hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekend ? 'active' : ''}
                  onClick={() => setOpenOnWeekend(true)}>
                    Sim
                </button>
                
                <button 
                  type="button"
                  className={!open_on_weekend ? 'active' : ''}
                  onClick={() => setOpenOnWeekend(false)}>
                    Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
} 