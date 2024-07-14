import { Component } from '@angular/core';
import { ApartmentMarketplaceModule } from './features/apartment/modules/apartment-marketplace.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isEditing = false;
  title = 'Apartment-Marketplace-UI';
  editApartmentId: string | null = null;

  onEditApartment(id: string) {
    this.isEditing = true;
    this.editApartmentId = id;
  }

  onEditCompleted() {
    this.isEditing = false;
    this.editApartmentId = null;
    this.reloadApartments();
  }

  reloadApartments() {
    // Logic to reload apartments in the list component
  }
}
