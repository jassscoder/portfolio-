# Jaspher Portfolio

This is a personal portfolio website for showcasing projects, skills, and experience. It's built with HTML, CSS and vanilla JavaScript, and includes animations via AOS and particles.js.

## Structure

- `index.html` – main page with sections for Home, About, Skills, Experience, Projects, and Contact.
- `style.css` – custom styles including responsive layouts and dark mode toggle.
- `script.js` – functionality for typing effect, preloader, theme toggle, modal dialogs, and more.
- `assets/` – contains media files such as `profile.jpg` and a placeholder resume.

## Notes

- Update the `projects` object in `script.js` with live links and descriptions.
- Replace placeholder contact info and social URLs in `index.html`.
- Add real resume PDF at `assets/Jaspher_Resume.pdf` to enable download.

To preview, run a simple HTTP server and open `http://localhost:8000` in your browser.

## SYSTEM TESTING

| Test Case ID | Description           | Expected Result                        | Actual Result               | Status | SQL Query Command                         |
|--------------|-----------------------|----------------------------------------|-----------------------------|--------|-------------------------------------------|
| TC1          | Add Patient Record    | Patient information saved successfully | Patient saved correctly     | Pass   | INSERT INTO patients (...)                |
| TC2          | View Patient Records  | Patient records are displayed          | Records displayed properly  | Pass   | SELECT * FROM patients                    |
| TC3          | Schedule Appointment  | Appointment details are saved          | Scheduled successfully      | Pass   | INSERT INTO appointments (...)            |
| TC4          | Update Patient Record | Changes to patient details are updated | Update successful           | Pass   | UPDATE patients SET ... WHERE ...         |
| TC5          | Delete Appointment    | Appointment is removed from system     | Deletion successful         | Pass   | DELETE FROM appointments WHERE ...        |
