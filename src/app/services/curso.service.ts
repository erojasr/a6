import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CursoInterface } from '../models/curso-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursosCollection: AngularFirestoreCollection<CursoInterface>;
  cursos: Observable<CursoInterface[]>;
  cursoDoc: AngularFirestoreDocument<CursoInterface>;

  constructor(public afs: AngularFirestore) { 
    //this.cursos = afs.collection('cursos').valueChanges();
    this.cursosCollection = afs.collection<CursoInterface>('cursos');
    this.cursos = this.cursosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CursoInterface;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    )
  }

  getCursos(){
    return this.cursos;
  }

  addCurso(curso: CursoInterface){
    console.log('NEW COURSE');
    this.cursosCollection.add(curso);
  }

  deleteCurso(){
    console.log('DELTE CURSO');
  }

  updateCurso(){
    console.log('UPDATE CURSO')
  }

}
