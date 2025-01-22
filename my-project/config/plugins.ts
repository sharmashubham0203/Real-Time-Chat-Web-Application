// export default () => ({});
export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('ADMIN_JWT_SECRET', 'your-generated-secret'),
    },
  },
});
