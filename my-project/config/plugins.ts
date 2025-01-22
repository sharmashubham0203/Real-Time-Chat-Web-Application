// export default () => ({});
export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', 'your-generated-secret'),
    },
  },
});
