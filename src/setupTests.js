// Importa los matchers personalizados de jest-dom para extender expect()
import '@testing-library/jest-dom';

// Polyfill para TextEncoder y TextDecoder (Node.js no los tiene por defecto)
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
