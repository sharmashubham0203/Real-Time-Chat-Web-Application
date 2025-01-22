// export default [
//   'strapi::logger',
//   'strapi::errors',
//   'strapi::security',
//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];


module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

// Update the CORS middleware to allow requests from your frontend
module.exports = {
  settings: {
    cors: {
      enabled: true,
      origin: ['https://real-time-chat-web-application-2.onrender.com'], // Allow this origin
      headers: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    },
  },
};


