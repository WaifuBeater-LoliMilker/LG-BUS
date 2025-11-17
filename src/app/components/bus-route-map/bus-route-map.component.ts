import { Component, Input, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { RouteDetail } from '../bus/bus.component';

@Component({
  selector: 'bus-route-map',
  templateUrl: './bus-route-map.component.html',
  styleUrls: ['./bus-route-map.component.css'],
  imports: [LeafletModule],
})
export class BusRouteMap implements OnInit {
  hanoiBounds = L.latLngBounds([
    [20.5, 105.5],
    [21.25, 106.3],
  ]);
  @Input() busStops: RouteDetail[] = [];
  options!: L.MapOptions;
  map!: L.Map;
  markers!: L.Marker[];
  markerLayer = L.layerGroup();
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
    this.markerLayer.addTo(this.map);
    if (!this.busStops.length) return;
    this.loadMap();
  }
  onRefreshMap(newData: RouteDetail[] = []) {
    if (this.map) {
      this.busStops = newData;
      this.loadMap();
      this.map.invalidateSize();
    }
  }
  clearLayer() {
    this.markerLayer.clearLayers();
  }
  loadMap() {
    this.markerLayer.clearLayers();
    const markers = this.busStops.map((point, idx) => {
      const marker = L.marker([point.lat, point.lng], {
        draggable: true,
        icon: L.divIcon({
          className: 'bus-stop-marker',
          html: '',
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        }),
      });
      marker.bindTooltip(`🚌 ${point.StopName}`, {
        permanent: true,
        direction: 'top',
      });
      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        this.busStops[idx].lat = pos.lat;
        this.busStops[idx].lng = pos.lng;
        this.onRefreshMap(this.busStops);
      });
      return marker;
    });
    markers.forEach((m) => {
      this.attachPopup(m);
      this.markerLayer.addLayer(m);
    });
    const polyline = L.polyline(
      this.busStops.map((s) => [s.lat, s.lng]),
      {
        color: 'cornflowerblue',
        weight: 5,
      }
    );
    this.markerLayer.addLayer(polyline);
  }
  attachPopup(marker: L.Marker) {
    var busStop = this.busStops.find((s) => {
      const latlng = marker.getLatLng();
      return s.lat == latlng.lat && s.lng == latlng.lng;
    });
    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
      <div class="input-group flex-nowrap">
        <input type="text" id="locName" class='form-control form-control-sm'
          value="${busStop?.StopName}" style="width: 328px;"/>
        <button id="saveBtn" class='btn btn-secondary input-group-text'>Save</button>
      </div>
    `;
    marker.bindPopup(popupContent);
    marker.on('popupopen', () => {
      marker.closeTooltip();
      const input = popupContent.querySelector<HTMLInputElement>('#locName')!;
      const btn = popupContent.querySelector<HTMLButtonElement>('#saveBtn')!;
      input.value = busStop?.StopName ?? '';
      btn.onclick = () => {
        busStop!.StopName = input.value;
        marker.setTooltipContent(`🚌 ${busStop?.StopName ?? ''}`);
        marker.closeTooltip();
        marker.closePopup();
        marker.openTooltip();
      };
    });
    marker.on('popupclose', () => {
      marker.openTooltip();
    });
  }
}
