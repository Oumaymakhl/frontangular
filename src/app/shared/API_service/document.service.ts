// document.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../model/document';

export interface listedocument {
  status: number;
  documents: Document[];
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  importDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>('http://localhost:8000/api/documents/import', formData);
  }

  exportDocument(documentId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8000/api/documents/${documentId}/export`, { responseType: 'blob' });
  }

  signDocument(documentId: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/documents/${documentId}/sign`);
  }

  downloadSignedDocument(documentId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8000/api/documents/${documentId}/download`, { responseType: 'blob' });
  }

  getDocuments() {
    return this.http.get<listedocument>('http://localhost:8000/api/documents');
  }
}
