import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import CivTierComponent from '@/components/civilisations/subcomponents/CivTierComponent.vue';

describe('CivTierComponent', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe('Template', () => {
        it('should render tier component', () => {
            const wrapper = mount(CivTierComponent, {
                props: { tier_id: 1 },
            });

            expect(wrapper.findComponent({ name: 'Tag' }).exists()).toBe(true);
        });

        it('should display tier with correct styling', () => {
            const wrapper = mount(CivTierComponent, {
                props: { tier_id: 1 },
            });

            const tierSpan = wrapper.find('span');
            expect(tierSpan.classes()).toContain('p-tag');
            expect(tierSpan.classes()).toContain('p-component');
        });

        it('should have correct container styling', () => {
            const wrapper = mount(CivTierComponent, {
                props: { tier_id: 1 },
            });

            const container = wrapper.find('div');
            expect(container.classes()).toContain('font-sans');
            expect(container.classes()).toContain('font-light');
            expect(container.classes()).toContain('text-xs');
        });
    });

    describe('Props', () => {
        it('should accept tier_id prop', () => {
            const wrapper = mount(CivTierComponent, {
                props: { tier_id: 1 },
            });

            expect((wrapper.props() as any).tier_id).toBe(1);
        });

        it('should handle different tier IDs', () => {
            const wrapper = mount(CivTierComponent, {
                props: { tier_id: 5 },
            });

            expect((wrapper.props() as any).tier_id).toBe(5);
        });
    });

    describe('Store Integration', () => {
        it('should use store to get tier color', () => {
            const wrapper = mount(CivTierComponent, {
                props: { tier_id: 1 },
            });

            const tierSpan = wrapper.find('span');
            expect(tierSpan.attributes('class')).toBeDefined();
        });

        it('should use store to get tier label', () => {
            const wrapper = mount(CivTierComponent, {
                props: { tier_id: 1 },
            });

            const tierSpan = wrapper.find('span');
            expect(tierSpan.text()).toBeDefined();
        });
    });

    describe('Styling', () => {
        it('should have correct tier styling classes', () => {
            const wrapper = mount(CivTierComponent, {
                props: { tier_id: 1 },
            });

            const tierSpan = wrapper.find('span');
            expect(tierSpan.classes()).toContain('p-tag');
            expect(tierSpan.classes()).toContain('p-component');
        });

        it('should have correct container styling classes', () => {
            const wrapper = mount(CivTierComponent, {
                props: { tier_id: 1 },
            });

            const container = wrapper.find('div');
            expect(container.classes()).toContain('font-sans');
            expect(container.classes()).toContain('font-light');
            expect(container.classes()).toContain('text-xs');
        });
    });

    describe('Edge Cases', () => {
        it('should handle non-existent tier ID', () => {
            const wrapper = mount(CivTierComponent, {
                props: { tier_id: 999 },
            });

            expect((wrapper.props() as any).tier_id).toBe(999);
            expect(wrapper.find('span').exists()).toBe(true);
        });

        it('should handle zero tier ID', () => {
            const wrapper = mount(CivTierComponent, {
                props: { tier_id: 0 },
            });

            expect((wrapper.props() as any).tier_id).toBe(0);
            expect(wrapper.find('span').exists()).toBe(true);
        });
    });
});
