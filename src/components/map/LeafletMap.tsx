"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in Next.js/React-Leaflet
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

type Clinic = {
    id: string;
    name: string;
    address: string;
    phone?: string;
    position: { lat: number; lng: number };
};

type MapProps = {
    center: { lat: number; lng: number };
    clinics: Clinic[];
    onSelectClinic: (clinic: Clinic) => void;
};

export default function LeafletMap({ center, clinics, onSelectClinic }: MapProps) {
    return (
        <MapContainer
            center={[center.lat, center.lng]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {clinics.map((clinic) => (
                <Marker
                    key={clinic.id}
                    position={[clinic.position.lat, clinic.position.lng]}
                    eventHandlers={{
                        click: () => onSelectClinic(clinic),
                    }}
                >
                </Marker>
            ))}
        </MapContainer>
    );
}
