import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [LeafletModule],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  busRoute: L.LatLngExpression[] = [
    [21.0285, 105.8542],
    [21.03, 105.86],
    [21.033, 105.87],
    [21.04, 105.875],
    [21.045, 105.88],
  ];
  currentPosition: L.LatLngExpression = [21.02968, 105.8587];
  markers!: L.CircleMarker[];
  currentMarker!: L.Marker;
  options!: L.MapOptions;
  routeBounds!: L.LatLngBounds;
  ngOnInit(): void {
    const hanoiBounds = L.latLngBounds([
      [20.5, 105.5],
      [21.25, 106.3],
    ]);
    const tileLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    );
    const routeLine = L.polyline(this.busRoute, {
      color: 'cornflowerblue',
      weight: 5,
    });
    this.markers = this.busRoute.map((point, index) =>
      L.circleMarker(point, {
        color: 'blue',
        radius: 6,
        fillColor: 'blue',
        fillOpacity: 0.9,
      }).bindTooltip(`🚌 Bus stop ${index + 1}`, {
        permanent: true,
        direction: 'top',
      })
    );
    const busStopIcon = L.icon({
      iconUrl: 'imgs/icons/running-bus.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, 0],
    });
    this.currentMarker = L.marker(this.currentPosition, {
      icon: busStopIcon,
    }).bindPopup('🚌 Current Bus Position');
    this.options = {
      layers: [tileLayer, routeLine, this.currentMarker, ...this.markers],
      maxBounds: hanoiBounds,
      zoom: 14,
      minZoom: 12,
      maxZoom: 18,
      maxBoundsViscosity: 1.0,
      center: L.latLng(this.currentPosition),
    };
    this.routeBounds = routeLine.getBounds().pad(0.05);
  }
  onMapReady(map: L.Map) {
    this.map = map;
    this.markers.forEach((m) => m.openPopup());
    this.currentMarker.openPopup();
  }

  onRefreshMap() {
    if (this.map) {
      this.map.invalidateSize();
      this.map.fitBounds(this.routeBounds);
      this.currentMarker.closePopup();
      this.currentMarker.openPopup();
    }
  }
}
