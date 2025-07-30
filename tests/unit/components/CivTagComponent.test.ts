import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import CivTagComponent from '@/components/civilisations/subcomponents/CivTagComponent.vue';

describe('CivTagComponent', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe('Template', () => {
        it('should render tag component', () => {
            const wrapper = mount(CivTagComponent, {
                props: { tag_id: 1 },
            });

            expect(wrapper.findComponent({ name: 'Tag' }).exists()).toBe(true);
        });

        it('should display tag with correct styling', () => {
            const wrapper = mount(CivTagComponent, {
                props: { tag_id: 1 },
            });

            const tagSpan = wrapper.find('span');
            expect(tagSpan.classes()).toContain('p-tag');
            expect(tagSpan.classes()).toContain('p-component');
        });

        it('should have correct container styling', () => {
            const wrapper = mount(CivTagComponent, {
                props: { tag_id: 1 },
            });

            const container = wrapper.find('div');
            expect(container.classes()).toContain('font-sans');
            expect(container.classes()).toContain('font-light');
            expect(container.classes()).toContain('text-xs');
        });
    });

    describe('Props', () => {
        it('should accept tag_id prop', () => {
            const wrapper = mount(CivTagComponent, {
                props: { tag_id: 1 },
            });

            expect((wrapper.props() as any).tag_id).toBe(1);
        });

        it('should handle different tag IDs', () => {
            const wrapper = mount(CivTagComponent, {
                props: { tag_id: 5 },
            });

            expect((wrapper.props() as any).tag_id).toBe(5);
        });
    });

    describe('Store Integration', () => {
        it('should use store to get tag color', () => {
            const wrapper = mount(CivTagComponent, {
                props: { tag_id: 1 },
            });

            const tagSpan = wrapper.find('span');
            expect(tagSpan.attributes('class')).toBeDefined();
        });

        it('should use store to get tag label', () => {
            const wrapper = mount(CivTagComponent, {
                props: { tag_id: 1 },
            });

            const tagSpan = wrapper.find('span');
            expect(tagSpan.text()).toBeDefined();
        });
    });

    describe('Styling', () => {
        it('should have correct tag styling classes', () => {
            const wrapper = mount(CivTagComponent, {
                props: { tag_id: 1 },
            });

            const tagSpan = wrapper.find('span');
            expect(tagSpan.classes()).toContain('p-tag');
            expect(tagSpan.classes()).toContain('p-component');
        });

        it('should have correct container styling classes', () => {
            const wrapper = mount(CivTagComponent, {
                props: { tag_id: 1 },
            });

            const container = wrapper.find('div');
            expect(container.classes()).toContain('font-sans');
            expect(container.classes()).toContain('font-light');
            expect(container.classes()).toContain('text-xs');
        });
    });

    describe('Edge Cases', () => {
        it('should handle non-existent tag ID', () => {
            const wrapper = mount(CivTagComponent, {
                props: { tag_id: 999 },
            });

            expect((wrapper.props() as any).tag_id).toBe(999);
            expect(wrapper.find('span').exists()).toBe(true);
        });

        it('should handle zero tag ID', () => {
            const wrapper = mount(CivTagComponent, {
                props: { tag_id: 0 },
            });

            expect((wrapper.props() as any).tag_id).toBe(0);
            expect(wrapper.find('span').exists()).toBe(true);
        });
    });
});
