// document.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  importDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post('http://localhost:8000/api/import-document', formData);
  }

  exportDocument(documentId: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/export-document/${documentId}`, { responseType: 'blob' });
  }

  signDocument(documentId: number) {
    return this.http.post<any>(`http://localhost:8000/api/sign-document/${documentId}`, {});
  }

  downloadSignedDocument(documentId: number) {
    return this.http.get(`http://localhost:8000/api/download-signed-document/${documentId}`, { responseType: 'blob' });
  }

  showDocuments(): Observable<any> {
    return this.http.get('http://localhost:8000/api/show-documents');
  }
  signAndDownloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8000/api/documents/${documentId}/sign-and-download`, { responseType: 'blob' });
  }
}
