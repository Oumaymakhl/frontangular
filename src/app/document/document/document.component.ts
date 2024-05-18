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
  selectedDocumentId: number | null = null; // Pour stocker l'ID du document sélectionné
  
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.chargerDocuments();
  }

  chargerDocuments() {
    this.documentService.showDocuments().subscribe(
      (response) => {
        this.documents = response;
        console.log('Documents chargés avec succès :', this.documents);
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
        console.log('Document importé avec succès :', response);
        this.chargerDocuments(); 
      },
      (error) => {
        console.error('Erreur lors de l\'importation du document :', error);
      }
    );
  }

  signAndDownload(documentId: number) {
    this.documentService.signAndDownloadDocument(documentId).subscribe((data: Blob) => {
      // Téléchargement du document signé
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  importerDocumentAvecSign(event: any) {
    const file = event.target.files[0];
    this.documentService.signDocument(file).subscribe(
      (response) => {
        console.log('Document signé avec succès :', response);
        // Gérer la réponse pour afficher un message ou effectuer d'autres actions
      },
      (error) => {
        console.error('Erreur lors de la signature du document :', error);
      }
    );
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

  selectDocument(documentId: number) {
    this.selectedDocumentId = documentId;
  }
  documentsFiltered(): Document[] {
    return this.documents.filter((document: Document) =>
      document.name.toLowerCase().includes(this.termeDeRecherche.toLowerCase())
    );
  }
}