import Orphanage from '../models/Orphanage';
import imagesView from '../views/imagesView'

export default{
  render(orphanage: Orphanage){
    return{
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.longitude,
      longitude: orphanage.latitude,
      about: orphanage.about,
      opening_hours: orphanage.opening_hours,
      open_on_weekend: orphanage.open_on_weekend,
      images: imagesView.renderMany(orphanage.images)
    }
  },
  
  renderMany(orphanages: Orphanage[]){
    return orphanages.map(orphanage => this.render(orphanage))
  }
}
