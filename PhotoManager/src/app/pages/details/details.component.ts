import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  data: any;
  constructor(private route: ActivatedRoute, private firestore: Firestore) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const docRef = doc(this.firestore, 'photos', id);
      getDoc(docRef).then((docData) => {
        if (docData.exists()) {
          this.data = docData.data();
        } else {
          console.log('No document found');
        }
      });
    }
  }
}
