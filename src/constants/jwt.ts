import 'dotenv/config';

export const jwtSecret = process.env.JWT_SECRET || '723cadebc979e29920103ee20528653a8fddd61d16b651647167ff5d9bdbe7d06c35b253626dcb9106296bda24854c8c464e51764d1627e613c1c09cf9a8196a';
export const jwtExpiry = process.env.JWT_EXPIRES_IN || '7d';
