import '@testing-library/jest-dom';

// Polyfill para TextEncoder y TextDecoder
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
