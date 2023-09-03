import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Photo } from 'src/app/models/photo.model';
import { GalleryService } from 'src/app/services/gallery.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  photoData!: Observable<Photo[]>;
  selectedImage: Photo | null = null;
  constructor(private firestore: Firestore, private router: Router, private galleryService: GalleryService) { }
  ngOnInit() {
    this.getData();
  }
  getData() {
    const collectionInstance = collection(this.firestore, 'photos');
    this.photoData = collectionData(collectionInstance, { idField: 'id' }).pipe(
      map(dataArray => dataArray.map(data => ({
        id: data['id'],
        title: data['title'],
        description: data['description'],
        imageUrl: data['imageUrl'],
        likes: data['likes']
      }) as Photo))
    );
  }
  onLike(photo: Photo) {
    this.galleryService.likePhoto(photo);
  }
  navigateToDetails(id: string) {
    this.router.navigate(['/image-details', id]);
  }
}
