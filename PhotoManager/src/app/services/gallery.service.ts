import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, increment, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private firestore: Firestore) {}
  // Sauvegarder ou mettre à jour une photo
  async savePhoto(photo: Photo): Promise<void> {
    const photosCollection = collection(this.firestore, 'photos');
    if (photo.id) {
      const photoRef = doc(photosCollection, photo.id);
      return await setDoc(photoRef, photo, { merge: true });
    } else {
      return await setDoc(doc(photosCollection), photo);
    }
  }
  // Récupérer toutes les photos
  getPhotos(): Observable<Photo[]> {
    return collectionData(collection(this.firestore, 'photos'), { idField: 'id' }) as Observable<Photo[]>;
  }
  // Supprimer un photo
  async deletePhoto(photoId: string): Promise<void> {
    const photoRef = doc(this.firestore, 'photos', photoId);
    return await deleteDoc(photoRef);
  }

   // Aimer une photo
   async likePhoto(photo: Photo): Promise<void> {
    if (photo.id) {
      const photoRef = doc(this.firestore, 'photos', photo.id);
      return await updateDoc(photoRef, {
        likes: increment(1)
      });
    } else {
      console.error('Cannot like a photo without ID');
    }
  }

}
