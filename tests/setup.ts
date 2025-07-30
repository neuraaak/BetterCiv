import '@testing-library/jest-dom';
import { config } from '@vue/test-utils';
import { vi } from 'vitest';

// Configuration globale pour Vue Test Utils
config.global.stubs = {
    'router-link': true,
    'router-view': true,
};

// Mock pour PrimeVue seulement
vi.mock('primevue/config', () => ({
    default: {
        install: vi.fn(),
    },
}));
