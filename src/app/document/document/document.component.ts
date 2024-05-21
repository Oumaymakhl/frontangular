import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'app/shared/API_service/document.service';
import { Document } from 'app/shared/model/document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  termeDeRecherche: string = '';
  documents: Document[] = [];
  selectedDocumentId: number | null = null;
  selectedSignature: File | null = null;
  
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.chargerDocuments();
  }

  chargerDocuments() {
    this.documentService.showDocuments().subscribe(
      (response) => {
        this.documents = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des documents :', error);
      }
    );
  }

  importerDocument(event: any) {
    const file = event.target.files[0];
    this.documentService.importDocument(file).subscribe(
      (response) => {
        this.chargerDocuments();
      },
      (error) => {
        console.error('Erreur lors de l\'importation du document :', error);
      }
    );
  }

  importerDocumentAvecSign(event: any) {
    this.selectedSignature = event.target.files[0];
  }

  
  exporterDocument(documentId: number, documentName: string) {
    this.documentService.exportDocument(documentId).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = documentName;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Erreur lors de l\'exportation du document :', error);
      }
    );
  }

  exporterDocumentAvecSignature(documentId: number, documentName: string) {
    if (!this.selectedSignature) {
      console.error('Veuillez d\'abord importer une signature.');
      return;
    }

    this.documentService.exportDocumentWithSign(documentId, this.selectedSignature).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `signed_${documentName}`;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Erreur lors de l\'exportation du document avec signature :', error);
      }
    );
  }

  selectDocument(documentId: number) {
    this.selectedDocumentId = documentId;
  }

  documentsFiltered(): Document[] {
    return this.documents.filter((document: Document) =>
      document.name.toLowerCase().includes(this.termeDeRecherche.toLowerCase())
    );
  }
}
