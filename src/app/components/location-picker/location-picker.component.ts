import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css'],
  imports: [LeafletModule],
})
export class LocationPickerComponent implements OnInit {
  hanoiBounds = L.latLngBounds([
    [20.5, 105.5],
    [21.25, 106.3],
  ]);
  options!: L.MapOptions;
  map!: L.Map;
  marker!: L.Marker;
  locationName = '';
  ngOnInit(): void {
    this.options = {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
      maxBounds: this.hanoiBounds,
      zoom: 14,
      minZoom: 12,
      maxZoom: 18,
      maxBoundsViscosity: 1.0,
      center: L.latLng(21.0285, 105.8542),
    };
  }

  onMapReady(map: L.Map) {
    this.map = map;
    const initialLatLng = this.options.center as L.LatLng;
    this.marker = L.marker(initialLatLng, { draggable: true }).addTo(this.map);
    this.locationName = `${initialLatLng.lat.toFixed(
      4
    )}, ${initialLatLng.lng.toFixed(4)}`;
    this.attachPopup(this.marker);
    this.marker.openPopup();
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const latlng = e.latlng;
      this.locationName = `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`;
      this.marker.setLatLng(latlng);
      this.attachPopup(this.marker);
      this.marker.openPopup();
    });
  }

  onRefreshMap() {
    if (this.map) {
      this.map.invalidateSize();
      this.marker.closePopup();
      this.marker.openPopup();
    }
  }
  attachPopup(marker: L.Marker) {
    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
      <div class="input-group flex-nowrap">
        <input type="text" id="locName" class='form-control form-control-sm'
          value="${this.locationName}" style="width: 328px;"/>
        <button id="saveBtn" class='btn btn-secondary input-group-text'>Save</button>
      </div>
    `;
    marker.bindPopup(popupContent);
    marker.on('popupopen', () => {
      const input = popupContent.querySelector<HTMLInputElement>('#locName')!;
      const btn = popupContent.querySelector<HTMLButtonElement>('#saveBtn')!;
      input.value = this.locationName;
      btn.onclick = () => {
        this.locationName = input.value;
        marker.setPopupContent(`<b>${this.locationName}</b>`);
        marker.openPopup();
      };
    });
  }
}
