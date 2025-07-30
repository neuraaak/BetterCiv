import { mount, VueWrapper } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import type { ComponentMountingOptions } from '@vue/test-utils';

/**
 * Test utilities for Vue components
 */

export interface TestWrapper<T = any> extends VueWrapper<T> {
    // Add custom methods if needed
}

/**
 * Create a test wrapper with Pinia store
 */
export function createTestWrapper(
    component: any,
    options: ComponentMountingOptions<any> = {}
): TestWrapper {
    const pinia = createPinia();
    setActivePinia(pinia);

    return mount(component, {
        global: {
            plugins: [pinia],
            stubs: {
                'router-link': true,
                'router-view': true,
            },
        },
        ...options,
    }) as TestWrapper;
}

/**
 * Mock civilization data for testing
 */
export const mockCivilizations = [
    {
        id: 1,
        name: 'France',
        description: 'A cultural civilization with unique units and buildings',
        unique_units: ['Musketeer'],
        unique_buildings: ['Chateau'],
        tags_id: [1, 2],
        tier_id: 2,
    },
    {
        id: 2,
        name: 'Germany',
        description: 'A military-focused civilization',
        unique_units: ['Panzer'],
        unique_buildings: ['Hans'],
        tags_id: [3, 4],
        tier_id: 1,
    },
    {
        id: 3,
        name: 'Spain',
        description: 'A religious civilization',
        unique_units: ['Conquistador'],
        unique_buildings: ['Mission'],
        tags_id: [2, 5],
        tier_id: 3,
    },
];

/**
 * Mock translation data for testing
 */
export const mockTranslations = {
    cardLabels: [
        {
            key: 'description',
            translations: [
                { lang: 'en', text: 'Description' },
                { lang: 'fr', text: 'Description' },
            ],
        },
        {
            key: 'unique_units',
            translations: [
                { lang: 'en', text: 'Unique Units' },
                { lang: 'fr', text: 'Unités uniques' },
            ],
        },
    ],
    tagsCorrespondence: [
        {
            id: 1,
            label: [
                { lang: 'en', text: 'Culture' },
                { lang: 'fr', text: 'Culture' },
            ],
            checked: false,
            color: 'bg-purple-500',
        },
        {
            id: 2,
            label: [
                { lang: 'en', text: 'Faith' },
                { lang: 'fr', text: 'Foi' },
            ],
            checked: false,
            color: 'bg-yellow-500',
        },
    ],
    tiersCorrespondence: [
        {
            id: 1,
            label: [
                { lang: 'en', text: 'S Tier' },
                { lang: 'fr', text: 'Niveau S' },
            ],
            checked: false,
            color: 'bg-red-500',
        },
        {
            id: 2,
            label: [
                { lang: 'en', text: 'A Tier' },
                { lang: 'fr', text: 'Niveau A' },
            ],
            checked: false,
            color: 'bg-orange-500',
        },
    ],
};

/**
 * Wait for next tick and flush promises
 */
export async function waitForNextTick(wrapper: TestWrapper): Promise<void> {
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Simulate user typing in input
 */
export async function typeInInput(
    wrapper: TestWrapper,
    selector: string,
    value: string
): Promise<void> {
    const input = wrapper.find(selector);
    await input.setValue(value);
    await input.trigger('input');
    await waitForNextTick(wrapper);
}

/**
 * Simulate user clicking on element
 */
export async function clickElement(wrapper: TestWrapper, selector: string): Promise<void> {
    const element = wrapper.find(selector);
    await element.trigger('click');
    await waitForNextTick(wrapper);
}

/**
 * Check if element has specific CSS classes
 */
export function hasClasses(wrapper: TestWrapper, selector: string, classes: string[]): boolean {
    const element = wrapper.find(selector);
    return classes.every(cls => element.classes().includes(cls));
}

/**
 * Mock store for testing
 */
export function createMockStore(overrides: any = {}) {
    return {
        cardLabels: mockTranslations.cardLabels,
        tagsCorrespondence: mockTranslations.tagsCorrespondence,
        tiersCorrespondence: mockTranslations.tiersCorrespondence,
        translationDict: [],
        lang: 'fr',
        cardId: null,
        selectedState: false,
        getTagList: () => mockTranslations.tagsCorrespondence,
        getTierList: () => mockTranslations.tiersCorrespondence,
        getTagPropertyById: (id: number, property: string) => {
            const tag = mockTranslations.tagsCorrespondence.find(t => t.id === id);
            if (!tag) return undefined;
            return tag[property as keyof typeof tag];
        },
        getTierPropertyById: (id: number, property: string) => {
            const tier = mockTranslations.tiersCorrespondence.find(t => t.id === id);
            if (!tier) return undefined;
            return tier[property as keyof typeof tier];
        },
        getTranslation: (key: string) => {
            const item = mockTranslations.cardLabels.find(cl => cl.key === key);
            const translation = item?.translations.find(t => t.lang === 'fr');
            return translation?.text || key;
        },
        getIconKeywordsDict: () => [],
        getLanguage: () => 'fr',
        getSelectedState: () => false,
        getSelectedCard: () => null,
        setLanguage: vi.fn(),
        setSelectedCard: vi.fn(),
        setSelectedState: vi.fn(),
        ...overrides,
    };
}

/**
 * Test data factory for civilizations
 */
export function createTestCivilization(overrides: any = {}): any {
    return {
        id: 1,
        name: 'Test Civilization',
        description: 'A test civilization',
        unique_units: ['Test Unit'],
        unique_buildings: ['Test Building'],
        tags_id: [1],
        tier_id: 1,
        ...overrides,
    };
}

/**
 * Test data factory for translations
 */
export function createTestTranslation(overrides: any = {}): any {
    return {
        lang: 'en',
        text: 'Test Translation',
        ...overrides,
    };
}

/**
 * Test data factory for card labels
 */
export function createTestCardLabel(overrides: any = {}): any {
    return {
        key: 'test_key',
        translations: [
            { lang: 'en', text: 'Test Label' },
            { lang: 'fr', text: 'Étiquette de test' },
        ],
        ...overrides,
    };
}
