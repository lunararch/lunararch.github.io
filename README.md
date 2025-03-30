# Portfolio Website for GitHub

This repository contains a modern portfolio website with a pastel color scheme, featuring interactive elements and a responsive design.

## Features

- Responsive design that works on all devices
- Interactive Three.js background animation
- Smooth scrolling and animations
- Project filtering functionality
- Skills visualization
- Contact form
- Pastel color scheme with magenta, light purple, light pink, and light blue

## Technologies Used

- HTML5
- CSS3 (Custom CSS with CSS Variables)
- JavaScript (ES6+)
- Three.js for 3D background effects
- GSAP for animations
- ScrollReveal for scroll animations
- Font Awesome for icons

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser
3. Customize the content to make it your own

## Customization

### Changing Colors

The color palette is defined in `assets/css/variables.css`. You can modify the colors there to match your preferences.

### Adding Projects

To add your own projects, edit the `projects-grid` section in `index.html`. Each project follows this structure:

```html
<div class="project-card" data-category="category">
    <div class="project-image">
        <!-- Add your project image here -->
    </div>
    <div class="project-info">
        <h3>Project Title</h3>
        <p>Project description</p>
        <div class="project-tags">
            <span>Tag1</span>
            <span>Tag2</span>
        </div>
        <div class="project-links">
            <a href="#" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
            <a href="#" target="_blank"><i class="fab fa-github"></i> GitHub</a>
        </div>
    </div>
</div>
```

### Updating Skills

To update your skills, modify the `skills-container` section in `index.html`. Adjust the skill levels by changing the width percentage in the style attribute.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Three.js for 3D effects
- GSAP for animations
- ScrollReveal for scroll animations
