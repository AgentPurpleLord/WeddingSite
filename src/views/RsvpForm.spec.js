import { mount } from '@vue/test-utils';
import RsvpForm from './RsvpForm.vue';

describe('RsvpForm', () => {
    it('renders the correct number of steps', () => {
        const wrapper = mount(RsvpForm);

        // Assert that the component renders the correct number of steps
        const steps = wrapper.findAll('.container');
        expect(steps.length).toBe(3);
    });

    it('updates the current step when nextStep is called', async () => {
        const wrapper = mount(RsvpForm);

        // Call the nextStep method
        await wrapper.vm.nextStep();

        // Assert that the current step has been updated
        expect(wrapper.vm.currentStep).toBe(2);
    });

    // Add more test cases as needed
});
