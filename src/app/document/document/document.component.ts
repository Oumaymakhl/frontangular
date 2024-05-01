
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
  documents: Document[] ;
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.chargerDocuments();
  }

  chargerDocuments() {
    this.documentService.getDocuments().subscribe(
      (response) => {
        this.documents = response.documents;
        console.log(response);
      },
      (error) => {
        console.error('Erreur lors du chargement des documents :', error);
      }
    );
  }
  

  importerDocument(file: File) {
    this.documentService.importDocument(file).subscribe(
      (response) => {
        console.log('Document imported successfully:', response);
        this.chargerDocuments(); 
      },
      (error) => {
        console.error('Error importing document:', error);
      }
    );
  }

  importerDocumentAvecSign(documentId: number) {
    this.documentService.signDocument(documentId).subscribe(
      (response) => {
        console.log('Document signed successfully:', response);

      },
      (error) => {
        console.error('Error signing document:', error);
      }
    );
  }

  exporterDocuments() {
    if (this.documents.length === 0) {
      console.log('Aucun document à exporter.');
      return;
    }
    this.documents.forEach(doc => {
      this.documentService.exportDocument(doc.id).subscribe(
        (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = doc.name; 
          document.body.appendChild(link);

          link.click();

          window.URL.revokeObjectURL(url);
        },
        (error) => {
          console.error('Erreur lors de l\'exportation du document :', error);
        }
      );
    });
  }
}
