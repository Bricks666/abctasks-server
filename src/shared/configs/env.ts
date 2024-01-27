/* eslint-disable no-underscore-dangle */
export const __TESTING__ = !!process.env.TESTING;
export const __DEV__ = process.env.NODE_ENV === 'development';
export const __PROD__ = process.env.NODE_ENV === 'production';
