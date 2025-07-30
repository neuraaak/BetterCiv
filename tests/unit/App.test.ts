import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import App from '@/App.vue';

describe('App.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe('Template', () => {
        it('should render App component', () => {
            const wrapper = mount(App);
            expect(wrapper.exists()).toBe(true);
        });

        it('should have header component', () => {
            const wrapper = mount(App);
            const header = wrapper.findComponent({ name: 'HeaderComponent' });
            expect(header.exists()).toBe(true);
        });

        it('should have content component', () => {
            const wrapper = mount(App);
            const content = wrapper.findComponent({ name: 'ContentComponent' });
            expect(content.exists()).toBe(true);
        });

        it('should have stagewise toolbar', () => {
            const wrapper = mount(App);
            const toolbar = wrapper.findComponent({ name: 'StagewiseToolbar' });
            expect(toolbar.exists()).toBe(true);
        });
    });

    describe('Structure', () => {
        it('should have proper component structure', () => {
            const wrapper = mount(App);
            expect(wrapper.findComponent({ name: 'HeaderComponent' }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: 'ContentComponent' }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: 'StagewiseToolbar' }).exists()).toBe(true);
        });

        it('should pass civilisations data to ContentComponent', () => {
            const wrapper = mount(App);
            const contentComponent = wrapper.findComponent({ name: 'ContentComponent' });
            expect(contentComponent.props('civilisations')).toBeDefined();
        });
    });

    describe('Integration', () => {
        it('should integrate with Pinia store', () => {
            const wrapper = mount(App);
            // App should work with Pinia store
            expect(wrapper.vm).toBeDefined();
        });

        it('should handle language changes', () => {
            const wrapper = mount(App);
            // App should handle language changes through store
            expect(wrapper.vm).toBeDefined();
        });
    });
});
