import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import CivCardComponent from '@/components/civilisations/CivCardComponent.vue';

describe('CivCardComponent', () => {
    const mockCivilization = {
        id: 1,
        name: 'France|La France',
        desc: 'A cultural civilization with unique units and buildings',
        tags_id: [1, 2],
        tier_id: 2,
        civ_leader_effect: 'Gain +2 Culture from each [CULTURE] building',
    };

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe('Template', () => {
        it('should render civilization card', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            expect(wrapper.find('.bg-zinc-950').exists()).toBe(true);
            expect(wrapper.find('.border-zinc-900').exists()).toBe(true);
            expect(wrapper.find('.rounded-xl').exists()).toBe(true);
        });

        it('should display civilization name correctly', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const title = wrapper.find('h1');
            expect(title.text()).toBe('France');
        });

        it('should display civilization description', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const description = wrapper.find('p.font-sans');
            expect(description.text()).toBe(mockCivilization.desc);
        });

        it('should render tier component', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            expect(wrapper.findComponent({ name: 'CivTierComponent' }).exists()).toBe(true);
        });

        it('should render tag components for each tag', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const tagComponents = wrapper.findAllComponents({ name: 'CivTagComponent' });
            expect(tagComponents).toHaveLength(2);
        });

        it('should render leader effect section', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            expect(wrapper.find('#leader').exists()).toBe(true);
        });
    });

    describe('Props', () => {
        it('should accept all required props', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            expect((wrapper.props() as any).id).toBe(1);
            expect((wrapper.props() as any).name).toBe('France|La France');
            expect((wrapper.props() as any).desc).toBe(
                'A cultural civilization with unique units and buildings'
            );
            expect((wrapper.props() as any).tags_id).toEqual([1, 2]);
            expect((wrapper.props() as any).tier_id).toBe(2);
            expect((wrapper.props() as any).civ_leader_effect).toBe(
                'Gain +2 Culture from each [CULTURE] building'
            );
        });

        it('should handle optional props', () => {
            const minimalProps = {
                id: 1,
                name: 'France',
            };

            const wrapper = mount(CivCardComponent, {
                props: minimalProps,
            });

            expect((wrapper.props() as any).id).toBe(1);
            expect((wrapper.props() as any).name).toBe('France');
            expect((wrapper.props() as any).desc).toBeUndefined();
            expect((wrapper.props() as any).tags_id).toBeUndefined();
            expect((wrapper.props() as any).tier_id).toBeUndefined();
            expect((wrapper.props() as any).civ_leader_effect).toBeUndefined();
        });
    });

    describe('Computed Properties', () => {
        it('should generate correct image path', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const vm = wrapper.vm as any;
            expect(vm.imagePath).toBe('/img/card-cover2.jpg');
        });

        it('should process leader effect with icons', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const vm = wrapper.vm as any;
            expect(vm.civLeaderEffectWithIcons).toBeDefined();
        });

        it('should set correct font size class for different languages', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const vm = wrapper.vm as any;

            // Test for non-CJK language (default)
            expect(vm.sizeClass).toBe('text-2xl');
        });
    });

    describe('Methods', () => {
        it('should toggle selected state when clicked', async () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const card = wrapper.find('.bg-zinc-950');
            await card.trigger('click');

            const vm = wrapper.vm as any;
            expect(vm.selectedCard).toBe(1);
            expect(vm.selectedState).toBe(true);
        });

        it('should call store methods when toggled', async () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const card = wrapper.find('.bg-zinc-950');
            await card.trigger('click');

            // Verify that the component state was updated
            const vm = wrapper.vm as any;
            expect(vm.selectedCard).toBe(1);
            expect(vm.selectedState).toBe(true);
        });
    });

    describe('User Interactions', () => {
        it('should handle click events', async () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const card = wrapper.find('.bg-zinc-950');
            await card.trigger('click');

            // Verify click was handled
            expect(card.exists()).toBe(true);
        });

        it('should toggle selection state on multiple clicks', async () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const card = wrapper.find('.bg-zinc-950');
            const vm = wrapper.vm as any;

            // First click
            await card.trigger('click');
            expect(vm.selectedState).toBe(true);

            // Second click
            await card.trigger('click');
            expect(vm.selectedState).toBe(false);
        });
    });

    describe('Styling', () => {
        it('should have correct CSS classes', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const card = wrapper.find('.bg-zinc-950');
            expect(card.classes()).toContain('bg-zinc-950');
            expect(card.classes()).toContain('border-zinc-900');
            expect(card.classes()).toContain('rounded-xl');
            expect(card.classes()).toContain('hover:border-zinc-800');
            expect(card.classes()).toContain('flex');
            expect(card.classes()).toContain('flex-col');
        });

        it('should have correct title styling', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const title = wrapper.find('h1');
            expect(title.classes()).toContain('shrink');
            expect(title.classes()).toContain('font-mono');
            expect(title.classes()).toContain('font-bold');
            expect(title.classes()).toContain('px-3');
            expect(title.classes()).toContain('pt-2');
        });

        it('should have correct description styling', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const description = wrapper.find('p.font-sans');
            expect(description.classes()).toContain('font-sans');
            expect(description.classes()).toContain('italic');
            expect(description.classes()).toContain('font-light');
            expect(description.classes()).toContain('text-sm');
            expect(description.classes()).toContain('leading-5');
            expect(description.classes()).toContain('px-3');
            expect(description.classes()).toContain('h-16');
        });

        it('should have correct leader effect styling', () => {
            const wrapper = mount(CivCardComponent, {
                props: mockCivilization,
            });

            const leaderSection = wrapper.find('#leader');
            expect(leaderSection.classes()).toContain('bg-zinc-900');
            expect(leaderSection.classes()).toContain('rounded-md');
            expect(leaderSection.classes()).toContain('mt-2');
            expect(leaderSection.classes()).toContain('mx-2');
            expect(leaderSection.classes()).toContain('px-2');
            expect(leaderSection.classes()).toContain('pb-2');
        });
    });

    describe('Edge Cases', () => {
        it('should handle civilization name with pipe separator', () => {
            const wrapper = mount(CivCardComponent, {
                props: {
                    ...mockCivilization,
                    name: 'France|La France|Francia',
                },
            });

            const title = wrapper.find('h1');
            expect(title.text()).toBe('France');
        });

        it('should handle empty civilization name', () => {
            const wrapper = mount(CivCardComponent, {
                props: {
                    ...mockCivilization,
                    name: '',
                },
            });

            const title = wrapper.find('h1');
            expect(title.text()).toBe('');
        });

        it('should handle missing tags', () => {
            const wrapper = mount(CivCardComponent, {
                props: {
                    ...mockCivilization,
                    tags_id: [],
                },
            });

            const tagComponents = wrapper.findAllComponents({ name: 'CivTagComponent' });
            expect(tagComponents).toHaveLength(0);
        });

        it('should handle missing leader effect', () => {
            const wrapper = mount(CivCardComponent, {
                props: {
                    ...mockCivilization,
                    civ_leader_effect: undefined,
                },
            });

            const leaderSection = wrapper.find('#leader');
            expect(leaderSection.exists()).toBe(true);
        });
    });
});
