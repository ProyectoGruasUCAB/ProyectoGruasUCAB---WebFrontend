import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBCXC7uePT5750nQIfin4xo6YjumYOAfEw",
  authDomain: "gruasucab-a7d08.firebaseapp.com",
  projectId: "gruasucab-a7d08",
  storageBucket: "gruasucab-a7d08.firebasestorage.app",
  messagingSenderId: "151879219568",
  appId: "1:151879219568:web:42114fd31cc1013531b7b5",
  measurementId: "G-XZPEBFQ0GB"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
 export const db = getFirestore(app);

// VAPID key que obtuviste de la consola de Firebase
const VAPID_KEY = "BIi6co20czNfdJqNRMV88Vmik2LA21J8WrFFwKoI38BynE73JLRSoYvpzlfab0wUGoi4kxf8pP2NX8FHQxmMZ8E";

// Solicitar permiso para recibir notificaciones y obtener el token FCM
const requestPermission = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    console.log('Token FCM:', token);
    // Aquí guarda el token en tu base de datos asociado al conductor
  } catch (error) {
    console.error('Error al obtener el token FCM:', error);
  }
};

// Escuchar mensajes entrantes (cuando la app está en primer plano)
onMessage(messaging, (payload) => {
  console.log('Mensaje recibido: ', payload);
  // Aquí puedes manejar la notificación y mostrarla al usuario
});

// Llamar a la función para solicitar el permiso
requestPermission();
