# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9a9924d0-413e-4085-9d2f-92b33686154c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9a9924d0-413e-4085-9d2f-92b33686154c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9a9924d0-413e-4085-9d2f-92b33686154c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.


## I have use the following prompt to create the website
```
Lovable Prompt: Multi-Agent AI Application UI
Objective: Create a clean, modern, and intuitive web application UI for running different AI agents (currently an SEO Content Agent and an Image Enhancer Agent). The UI must allow users to select an agent, provide the required inputs (an image and a text prompt), and view the generated output appropriately based on the selected agent.

Overall Layout:

Header/Navbar: Simple header with the application title (e.g., "AI Agent Hub").
Main Content Area: A two-column layout is preferred, but a single main area is also acceptable.
Left Side (or Top Section): Agent Selection & Inputs: Components for choosing the agent and providing inputs.
Right Side (or Bottom Section): Output Display: Area to show the results from the agent.
Component Breakdown:

Agent Selector:

Component Type: Use a Dropdown Menu.
Label: "Select Agent:"
Options:
"SEO Content Agent"
"Image Enhancer Agent"
Behavior: Selecting an agent should update the Input Area to show relevant fields (though currently, both need the same inputs). Store the selected agent's name.
Input Area: (Should ideally appear after an agent is selected)

Image Upload:
Component Type: A standard File Input component styled nicely (e.g., a drag-and-drop area or a button).
Label: "Upload Product Image:"
Required: Yes.
Functionality: Should allow users to select an image file (jpg, png, webp). Display a small preview of the uploaded image. Internal note: This component will need to handle reading the file and converting it to Base64 before sending it to the backend.
Text Input:
Component Type: A Text Area component (multi-line).
Label: "Enter Your Prompt/Query:" (This label could dynamically change slightly based on the selected agent, e.g., "Enter SEO Query:" or "Enter Creative Prompt:")
Placeholder Text: (Dynamically change based on agent) e.g., "Describe the desired SEO content..." or "Describe the advertisement scene you want to create..."
Required: Yes.
Action Button:

Component Type: A primary Button.
Label: "Run Agent"
Behavior: When clicked, it should trigger the backend API call, passing the selected agent name, the Base64 encoded image, and the text prompt. The button should be disabled while the agent is running.
Status/Loading Indicator:

Component Type: A Spinner or a simple text message (e.g., "Processing...").
Behavior: Should be displayed prominently while the backend is processing the request (after clicking "Run Agent" and before the output is ready). Hide the input fields or make them read-only during processing.
Output Display Area:

Conditional Display: The format of this area depends on the agent that was run.
Default State: Initially empty or showing placeholder text (e.g., "Results will appear here.").
Output for "SEO Content Agent":
Component Type: A container that can render Markdown text accurately (preserving formatting like bolding, bullet points, headings).
Content: Display the Markdown string returned by the agent.
Output for "Image Enhancer Agent":
Component Type: An Image component.
Content: Display the newly generated image. The backend will return the path to the saved image; the frontend will need to construct the correct URL to display it (or receive the image data directly if using a different backend approach). Include a text label below the image showing the returned file path.
Error Handling: If the agent returns an error message (as a string), display this error message clearly within the output area (e.g., using red text or an alert component).
Styling:

Use a clean, professional, and modern design aesthetic.
Ensure good contrast and readability.
Make the layout responsive for different screen sizes if possible.
User Flow:

User selects an agent from the dropdown/radio group.
Input fields (Image Upload, Text Input) appear.
User uploads an image and enters a text prompt.
User clicks "Run Agent".
Loading indicator appears; inputs might be disabled.
Backend processes the request.
Loading indicator disappears.
Output Display Area updates to show the Markdown text (for SEO agent) or the generated image (for Image agent), or an error message.
```

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
