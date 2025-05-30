
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import CallbackForm from '@/components/CallbackForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  const contactInfo = {
    address: {
      ua: "вул. Київська 25, Київ, Україна",
      ru: "ул. Киевская 25, Киев, Украина",
      en: "25 Kyivska St., Kyiv, Ukraine"
    },
    phone: "+380 44 123 4567",
    email: "info@vsoundevents.ua",
    hours: {
      ua: "Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 15:00",
      ru: "Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 15:00",
      en: "Mon-Fri: 9:00 - 18:00, Sat: 10:00 - 15:00"
    },
    title: {
      ua: "Контактна інформація",
      ru: "Контактная информация",
      en: "Contact Information"
    },
    form_title: {
      ua: "Зв'яжіться з нами",
      ru: "Свяжитесь с нами",
      en: "Contact Us"
    },
    form_subtitle: {
      ua: "Заповніть форму нижче і ми зв'яжемося з вами найближчим часом",
      ru: "Заполните форму ниже и мы свяжемся с вами в ближайшее время",
      en: "Fill out the form below and we will contact you shortly"
    },
    map_title: {
      ua: "Наше розташування",
      ru: "Наше расположение",
      en: "Our Location"
    }
  };
  
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize map with a temporary token
    // In production, this should be stored securely
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbGwyOGJ4ZnAwMDJhM2NwZnB1cWVyZGduIn0.ZmdaSrzgvGOTJP_I07vz1Q';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [30.5234, 50.4501], // Kyiv coordinates
      zoom: 12
    });
    
    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );
    
    // Add marker
    new mapboxgl.Marker({ color: '#3b82f6' })
      .setLngLat([30.5234, 50.4501])
      .addTo(map.current);
    
    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {language === 'ua' ? 'Зворотній зв\'язок' : language === 'ru' ? 'Обратная связь' : 'Contact Us'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        <Card>
          <CardHeader>
            <CardTitle>{contactInfo.title[language]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
              <p>{contactInfo.address[language]}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-1" />
              <p>{contactInfo.phone}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0 mt-1" />
              <p>{contactInfo.email}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary shrink-0 mt-1" />
              <p>{contactInfo.hours[language]}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{contactInfo.form_title[language]}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              {contactInfo.form_subtitle[language]}
            </p>
            <CallbackForm includeDescription={true} />
          </CardContent>
        </Card>
      </div>

      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{contactInfo.map_title[language]}</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={mapContainer} className="w-full h-[400px] rounded-md" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
