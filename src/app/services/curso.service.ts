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
  }

  getCursos(){
    
    this.cursos = this.cursosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CursoInterface;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    );
    return this.cursos;
  }

  addCurso(curso: CursoInterface){
    console.log('NEW COURSE');
    this.cursosCollection.add(curso);
  }

  deleteCurso(curso: CursoInterface){
    console.log('DELTE CURSO');
    this.cursoDoc = this.afs.doc(`cursos/${curso.id}`);
    this.cursoDoc.delete();
  }

  updateCurso(curso: CursoInterface){
    console.log('UPDATE CURSO');
    this.cursoDoc = this.afs.doc(`cursos/${curso.id}`);
    this.cursoDoc.update(curso);
  }

}
