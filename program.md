The program is a VueJs 3 Composition Api program. It is a wedding website designed to provide guests with a portal to
complete an RSVP form and see the schedule of the wedding.

The program is broken down into components.

# App.vue
App.vue creates the website & allows a basic router (not vue router) to let users navigate between pages.
It also contains the navbar code which is not in its own class.


# Home.vue
Home.vue is a basic app which contains components to create the home page.

## HeaderBox.vue
Contains basic HTML and CSS, no special functions.

## Schedule.vue
Contains basic HTML and CSS, no special functions.


# The Rsvp Form
This is the parent component / page for the Rsvp Form which is filled out by users. It works on the following assumption:

- A user is a person who receives an invitation (send via mail).
- A user filling out the form is separate to a 'guest'.
- A guest is someone the user is telling us who they are bringing along with them.

## RsvpForm.vue
Rsvp Form is the parent component. It contains a number of child components:

The parent form contains the following data structure:
```javascript
const formData = reactive({
attendance: '',
name: '',
phone: '',
email: '',
dietaryOptions: {
vegetarian: false,
vegan: false,
glutenFree: false,
nutFree: false,
dairyFree: false,
other: false,
otherText: '',
showOtherTextArea: false,
},
guestCount: 0,
guests: [],
errors: {},
});

```
The Rsvp Form is also in charge of validation error handling, checking if any of the child components have raised an error flag.
If a child component has raised an error flag, Rsvp Form sends a signal to the FormButtons.vue to disable the next step.

1. Step1.vue
   1. Contains 2x attendance radio buttons for the user to select whether they are attending.
2. Step2.vue
   1. Contains input boxes for the user to input their data. Validation is conducted on user input.
      1. Name
         1. Validation: Name > 2 characters
            1. Validation Error: Displays error message.
            2. Validation Error: Raises error flag to RsvpForm.vue.
      2. Phone Number
         1. Validation: Phone Number === 0421850636 || 0421 850 636 || 03 9606 6066 || 0396066066
             1. Validation Error: Displays error message.
             2. Validation Error: Raises error flag to RsvpForm.vue.
      3. Email
         1. Validation: Contains an @ symbol
            1. Validation Error: Displays error message.
            2. Validation Error: Raises error flag to RsvpForm.vue.
   2. Dietary Requirements (not a required field, no validation).
      1. Vegetarian
      2. Vegan
      3. Gluten-Free
      4. Nut-Free
      5. Dairy-Free
      6. Other
   3. Additional Guests
3. Step3.vue
   1. Lists each additional guest created by the user in Step2.vue. Validation is conducted on user input.
      1. Guest Name
         1. Validation: Name > 2 characters
            1. Validation Error: Displays error message.
            2. Validation Error: Raises error flag to RsvpForm.vue.
      2. Guest Dietary Requirements
         1. Vegetarian
         2. Vegan
         3. Gluten-Free
         4. Nut-Free
         5. Dairy-Free
         6. Other
4. FormButtons.vue
   1. Cycles through Step 1, Step 2 and Step 3.
   2. Also cycles through guests at Step 3 by accessing the guest index value.
   3. On the last guest, it removes the next button and replaces it with a Submit button.

