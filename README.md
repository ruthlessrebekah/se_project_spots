# Project 3: Spots

## Description

"Spots" is a dynamic web application and photo-sharing platform designed for social media users such as travelers and photography enthusiasts to share their travel history, experiences, and interests through a curated collection of photographs. This responsive platform allows users to share, explore, discover, and interact with beautiful various locations shared by the community. The project features a responsive design that works seamlessly across different device sizes, from desktop to mobile. Users can view photo cards, like their favorite spots, and manage their profile information.

The application features an elegant, user-friendly interface where visitors can:

- Browse through a collection of location-based photographs
- Interact with content through an intuitive 'like' system
- View and customize their profile information
- Experience seamless viewing across all devices (desktop, tablet, and mobile)

Built with modern web technologies and following BEM methodology, Spots demonstrates responsive design principles and efficient CSS architecture. The interface smoothly adapts from mobile devices (320px) to large desktop screens, ensuring an optimal viewing experience across all platforms.

## Features

- Responsive design layout that adapts to different screen sizes
- Customizable photo gallery
- Profile section with editable user information
- Like System with interactive heart-shaped icon button for liking photos
- Photo grid where users can add photos
- Text overflow handling with ellipsis
- Hover effects on interactive elements
- Mobile-first approach to media queries

## Technologies and Techniques Used

- **HTML5**
- **CSS3** with Flexbox and Grid layouts
- **BEM Methodology** for class naming and file structure
- **Responsive Design** with media queries, flexbox, and grid layout
- **CSS properties** for image handling and text overflow
- **Flat BEM file structure**

## Project Structure

The project follows BEM methodology with the following structure:

- `blocks/` - Contains BEM blocks
- `images/` - Image assets
- `pages/` - CSS files for pages
- `vendor/` - Third-party files (normalize.css, fonts)

## Future Improvements

- Add JavaScript functionality for the like button
- Implement profile editing feature
- Add photo upload capability
- Create user authentication

## Running the Project

The project can be run locally by cloning the repository and opening index.html in a web browser.

## Demo

https://ruthlessrebekah.github.io/se_project_spots

## Screenshots

![Desktop view](./images/spots-1440-view.PNG)
![Tablet view](./images/spots-1024-view.PNG)
![Mobile view](./images/spots-320-view.PNG)

## Video

https://drive.google.com/file/d/11DFBf0nYyvh6G34_nhYO3PILlLnRPjNm/view?usp=sharing

## Recent Updates

### Code Improvements

1. **Form Handling Enhancement**

   - Standardized variable naming from 'formData' to 'inputValues' across all form handling functions
   - Added form reset functionality after submission using the `reset()` method

2. **Modal Management**

   - Implemented centralized modal management functions (`openModal()` and `closeModal()`)
   - Replaced direct classList manipulation with reusable modal functions
   - Enhanced code maintainability and reduced redundancy

3. **Code Organization**
   - Improved code structure and readability
   - Maintained consistent naming conventions throughout the codebase

# Project Changelog

## Core Features Implemented

### Card Management System

1. **Dynamic Card Generation**

   - Implemented template-based card generation system
   - Created `getCardEl()` function for card element creation
   - Successfully generating initial cards from `initialCards` array

2. **Card Interactions**
   - Added like button functionality with toggle effect
   - Implemented card deletion feature
   - Created preview modal for card images
   - Cards are properly ordered (new cards prepend to list)

### Modal System

1. **Modal Architecture**

   - Implemented centralized modal management with `openModal()` and `closeModal()`
   - Added smooth transitions for modal opening/closing
   - Created reusable modal functions to reduce code duplication

2. **Form Handling**
   - Standardized form data handling using consistent variable naming (`inputValues`)
   - Added form reset functionality after submission
   - Implemented proper form submission prevention

### Profile Management

1. **Profile Editing**
   - Added profile edit functionality
   - Implemented auto-population of current values in edit form
   - Added form validation and submission handling

## Code Quality Improvements

### JavaScript Optimizations

1. **Variable Naming**

   - Standardized naming conventions using camelCase
   - Improved variable naming clarity and consistency
   - Removed redundant variable declarations

2. **Function Organization**
   - Implemented modular function structure
   - Created reusable utility functions
   - Improved event handling organization

### Best Practices

1. **Code Structure**

   - Maintained proper DOM manipulation practices
   - Implemented event delegation where appropriate
   - Added proper error prevention and handling

2. **Performance**
   - Optimized DOM operations
   - Improved code reusability
   - Enhanced maintainability through consistent patterns

## UI/UX Enhancements

1. **Modal Interactions**

   - Smooth transitions for modal windows
   - Improved form feedback
   - Enhanced user experience with clear interaction patterns

2. **Responsive Design**
   - Ensured proper layout at all breakpoints
   - Maintained consistent styling across devices
   - Implemented proper mobile responsiveness
