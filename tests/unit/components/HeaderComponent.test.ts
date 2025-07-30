import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';

describe('HeaderComponent', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe('Template', () => {
        it('should render header component', () => {
            const wrapper = mount(HeaderComponent);

            expect(wrapper.find('header').exists()).toBe(true);
            expect(wrapper.find('.header').exists()).toBe(true);
        });

        it('should render logo', () => {
            const wrapper = mount(HeaderComponent);

            const logo = wrapper.find('img[alt="Logo"]');
            expect(logo.exists()).toBe(true);
            expect(logo.attributes('src')).toBe('/img/logo.png');
            expect(logo.classes()).toContain('logo');
        });

        it('should render language selector component', () => {
            const wrapper = mount(HeaderComponent);

            expect(wrapper.findComponent({ name: 'SelectLanguageComponent' }).exists()).toBe(true);
        });

        it('should have correct header structure', () => {
            const wrapper = mount(HeaderComponent);

            const header = wrapper.find('header');
            expect(header.classes()).toContain('header');
            expect(header.classes()).toContain('flex');
            expect(header.classes()).toContain('flex-row');
        });

        it('should have correct logo container', () => {
            const wrapper = mount(HeaderComponent);

            const logoContainer = wrapper.find('div');
            expect(logoContainer.classes()).toContain('flex');
            expect(logoContainer.classes()).toContain('grow');
            expect(logoContainer.classes()).toContain('justify-center');
            expect(logoContainer.classes()).toContain('w-full');
            expect(logoContainer.classes()).toContain('ml-20');
        });
    });

    describe('Styling', () => {
        it('should have correct header styling classes', () => {
            const wrapper = mount(HeaderComponent);

            const header = wrapper.find('header');
            expect(header.classes()).toContain('header');
            expect(header.classes()).toContain('flex');
            expect(header.classes()).toContain('flex-row');
        });

        it('should have correct logo styling', () => {
            const wrapper = mount(HeaderComponent);

            const logo = wrapper.find('img.logo');
            expect(logo.classes()).toContain('logo');
        });

        it('should have correct language selector positioning', () => {
            const wrapper = mount(HeaderComponent);

            const languageSelector = wrapper.findComponent({ name: 'SelectLanguageComponent' });
            expect(languageSelector.classes()).toContain('mr-8');
        });
    });

    describe('Layout', () => {
        it('should have proper flex layout', () => {
            const wrapper = mount(HeaderComponent);

            const header = wrapper.find('header');
            expect(header.classes()).toContain('flex');
            expect(header.classes()).toContain('flex-row');
        });

        it('should have logo centered in container', () => {
            const wrapper = mount(HeaderComponent);

            const logoContainer = wrapper.find('div');
            expect(logoContainer.classes()).toContain('justify-center');
        });

        it('should have language selector on the right', () => {
            const wrapper = mount(HeaderComponent);

            const languageSelector = wrapper.findComponent({ name: 'SelectLanguageComponent' });
            expect(languageSelector.classes()).toContain('mr-8');
        });
    });

    describe('Accessibility', () => {
        it('should have proper alt text for logo', () => {
            const wrapper = mount(HeaderComponent);

            const logo = wrapper.find('img');
            expect(logo.attributes('alt')).toBe('Logo');
        });

        it('should have semantic header element', () => {
            const wrapper = mount(HeaderComponent);

            expect(wrapper.find('header').exists()).toBe(true);
        });
    });

    describe('Component Integration', () => {
        it('should properly integrate SelectLanguageComponent', () => {
            const wrapper = mount(HeaderComponent);

            const languageSelector = wrapper.findComponent({ name: 'SelectLanguageComponent' });
            expect(languageSelector.exists()).toBe(true);
            expect(languageSelector.classes()).toContain('mr-8');
        });
    });

    describe('Responsive Design', () => {
        it('should have responsive flex layout', () => {
            const wrapper = mount(HeaderComponent);

            const header = wrapper.find('header');
            expect(header.classes()).toContain('flex');
            expect(header.classes()).toContain('flex-row');
        });

        it('should have proper spacing with margin classes', () => {
            const wrapper = mount(HeaderComponent);

            const logoContainer = wrapper.find('div');
            expect(logoContainer.classes()).toContain('ml-20');

            const languageSelector = wrapper.findComponent({ name: 'SelectLanguageComponent' });
            expect(languageSelector.classes()).toContain('mr-8');
        });
    });
});
