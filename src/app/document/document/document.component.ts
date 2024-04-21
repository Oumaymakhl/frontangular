import { Component } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {
  // Propriété pour le terme de recherche
  termeDeRecherche: string = '';

  // Liste des documents
  documents = [
    {
      fichier: 'document1.pdf' // URL du fichier
    },
    {
      fichier: 'document2.pdf' // URL du fichier
    }
    // Ajoutez d'autres documents si nécessaire
  ];

  // Getter pour les documents filtrés
  get filteredDocuments() {
    // Filtrer les documents en fonction du terme de recherche
    return this.documents.filter(document => 
      document.fichier.toLowerCase().includes(this.termeDeRecherche.toLowerCase())
    );
  }

  // Méthode pour importer un document
  importerDocument(document: any) {
    // Ajoutez votre logique pour importer un document
    console.log('Importer document:', document.fichier);
  }

  // Méthode pour importer un document avec une signature
  importerDocumentAvecSign(document: any) {
    // Ajoutez votre logique pour importer un document avec une signature
    console.log('Importer document avec sign:', document.fichier);
  }

  // Méthode pour exporter tous les documents
  exporterDocuments() {
    // Ajoutez votre logique pour exporter tous les documents
    console.log('Exporter tous les documents');
  }

  // Méthode pour importer tous les documents

}
