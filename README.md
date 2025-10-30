# code-institute-adhd-hacks

### Deployed website:
https://realtimebasecamp.github.io/code-institute-adhd-hacks/

### Application purpose:
A simple educational website designed to help people with ADHD. This is not a real website, it is developed to test my skills as part of the Code Institute full stack boot camp first assessment.

### User value:
People with ADHD or people who know someone with ADHD can use this website to manage their symptoms easier and become more healthy and productive in day-to-day life.

### deployment steps:
1. Github repo > Settings > Code and automation tab > Pages
2. Build and deployment > Source > Deploy from a branch
3. Select branch > main
3. Save
![github pages deployment screenshot](/assets/images/github-pages-deployment.png "github pages deployment screenshot")

### Features:

1. Users can learn more about the different types of ADHD.
2. Users can access ADHD resources, covering tips, products, music and videos designed to help manage ADHD symptoms.
3. The website has a dark/light mode toggle button using custom JS code.
4. Users can submit enquiries via the contact form.

### External code sources:
**Custom CSS from:** Bootstrap library 5.3.8

**All icons are embedded from:** https://fontawesome.com/

## Design:
https://dummyimage.com/
Was used to create placeholder images which would contain my responsive charts
![Dummy image generator](/assets/images/dummy-images.png "Dummy images diagram")

# Implementation:
https://www.chartjs.org/
Was used to create the responsive pie and bar charts.

## Wireframes:
All wireframes were built using [Balsamiq](https://balsamiq.com/).
![Website wireframes](/assets/images/wireframes.png "Website wireframe diagram")

## User stories (Linear):
I did not choose to create user stories as this project was only 3 days long. Instead I created detailed wireframes that explained the user flow and journey.

## Validation:
- [ ]  WCAG
- [ ]  HTML
- [ ]  CSS
- [ ]  Jigsaw
- [ ]  Site deployed on Github pages with no errors

### Use of AI:
Key decisions where AI was used to generate code, focusing on the outcomes rather than detailed prompts or manual interventions:
- ???
- ???
- ???

AI’s role in identifying and resolving bugs, noting key interventions:
- ???
- ???
- ???

How AI contributed to performance and UX improvements. Minimal documentation of AI use:
- ???
- ???
- ???

### How AI influenced workflow, focusing on efficiency and outcomes without in-depth prompt documentation:
I used Github desktop copilot to automatically generate cleaner and more concise commit messages.
![Github desktop copilot commit message screenshot explaining AI use](/assets/images/github-desktop-copilot.png "Github desktop copilot commit message screenshot explaining AI use")

- ???
- ???

### Challenges:
The darkmode toggle was causing an artefact when switching between pages. This was hard to debug but eventually I realised it was caused by the order of operations. The artefact was due to a "Flash of Unstyled Content" (FOUC). To fix this issue I created a script that cached the user theme across the site and accessed it before the HTML elements were rendered. This way the darkmode was applied before any elements were rendered.