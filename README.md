Next.js College Booking Application🚀 Live DemoExplore the live application here: https://next-js-college-booking.vercel.app/✨ Overviewnext-js-college-booking is a full-stack web application built with Next.js, Node.js, and MongoDB (MERN stack) that provides a user-friendly interface for booking college services and facilities. It features comprehensive college listings, an admission application process, user authentication (email/password, Google, GitHub), user profiles, and a review system.🌟 FeaturesThis application is designed to meet the following requirements:College Booking Facilities: Core functionality for users to book college services.Intuitive Navigation: A clear navigation bar with Home, Colleges, Admission, and My College sections.Dynamic Home Page:College Search: A prominent search field to find colleges by name.Featured Colleges: A dedicated section showcasing 3 college cards with essential details (image, name, admission dates, events, research history, sports).Detailed College View: Clicking "Details" on a college card navigates to a comprehensive page displaying detailed information including images, admission process, event details, research works, and sports categories.Image Gallery: A visual section featuring group pictures of college graduates.Research Highlights: Links to recommended research papers by college students.Student Reviews: A section where users can view feedback and reviews about specific colleges.Dedicated Routes:/colleges: Displays a list of all colleges (minimum 5-6 cards) with image, name, rating, admission date, research count, and a "Details" button./admission: Presents a list of colleges, and upon selection, reveals an admission form with fields for Candidate Name, Subject, Email, Phone, Address, Date of Birth, and an Image upload./my-college: After submitting an admission, users can view their application details and add/edit a review with a rating option. Reviews are reflected on the home page.Robust Authentication System:Multiple Login Options: Supports registration and login via Email/Password, Google, and GitHub authentication.Password Reset: Functionality to reset forgotten passwords.Access Control: College details and review submission are restricted to logged-in users.Personalized User Profile:Displays the logged-in user's profile name.Clicking the profile name navigates to a dedicated profile route.Profile Editing: Users can edit their Name, Email, University, and Address, with changes being saved and updated.Responsive Design: Fully responsive UI, ensuring a flawless experience across desktops, tablets, and mobile phones.Custom 404 Page: A creatively designed 404 "Not Found" route.🛠️ Technologies UsedThe project leverages the following technologies:Frontend:Next.js 15.3.5 - React framework for production.React 19.0.0 - JavaScript library for building user interfaces.Tailwind CSS 4.1.11 - A utility-first CSS framework for rapid UI development.DaisyUI 5.0.46 - Tailwind CSS component library.React Icons 5.5.0 - Popular icon library for React.React Hot Toast 2.5.2 - For beautiful, accessible, and customizable toasts.Swiper 11.2.10 - Modern touch slider (if implemented for galleries/carousels).Backend & Database:Node.js - JavaScript runtime environment.MongoDB 6.17.0 - NoSQL database.Mongoose (Implicitly used via dbConnect for MongoDB interactions)NextAuth.js 4.24.11 - Authentication for Next.js applications.Bcrypt 6.0.0 - For password hashing.Nodemailer 6.10.1- For sending emails (e.g., password reset).ImgBB - Image hosting service for user uploads.Deployment:Vercel - Platform for frontend frameworks and static sites.📂 Folder Structure.
├── public/
│   ├── uploads/          # Directory for uploaded images (not used on Vercel, replaced by ImgBB)
│   └── ...               # Static assets like default images, favicon
├── src/
│   ├── app/
│   │   ├── actions/      # Server Actions (e.g., auth actions like registerUser, loginUser)
│   │   │   └── auth/
│   │   │       ├── loginUser.js
│   │   │       └── registerUser.js
│   │   ├── api/          # Next.js API Routes
│   │   │   ├── admission/
│   │   │   │   └── route.js
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.js
│   │   │   ├── colleges/
│   │   │   │   └── route.js
│   │   │   ├── my-admissions/ # API to fetch user's admission
│   │   │   │   └── route.js
│   │   │   ├── reviews/
│   │   │   │   └── route.js
│   │   │   └── users/      # API for user profile updates
│   │   │       └── route.js
│   │   ├── components/   # Reusable React components (e.g., CollegeCard, Navbar, Footer)
│   │   │   ├── auth/
│   │   │   │   └── SocialLogin.jsx
│   │   │   ├── CollegeCard.jsx
│   │   │   └── ...
│   │   ├── lib/          # Utility functions and configurations
│   │   │   ├── authOptions.js # NextAuth.js configuration
│   │   │   ├── dbConnect.js   # MongoDB connection setup
│   │   │   └── ...
│   │   ├── (routes)/     # Top-level pages/routes
│   │   │   ├── page.js (Home)
│   │   │   ├── colleges/
│   │   │   │   ├── [collegeId]/ # Dynamic route for college details
│   │   │   │   │   └── page.js
│   │   │   │   └── page.js (All Colleges)
│   │   │   ├── admission/
│   │   │   │   └── page.js
│   │   │   ├── my-college/
│   │   │   │   └── page.js
│   │   │   ├── login/
│   │   │   │   └── page.js
│   │   │   ├── register/
│   │   │   │   ├── components/
│   │   │   │   │   └── RegisterForm.jsx
│   │   │   │   └── page.js
│   │   │   ├── profile/
│   │   │   │   └── page.js
│   │   │   ├── forgot-password/
│   │   │   │   └── page.js
│   │   │   ├── reset-password/
│   │   │   │   └── page.js
│   │   │   └── not-found.js (404 page)
│   │   ├── globals.css   # Global CSS styles
│   │   └── layout.js     # Root layout for Next.js
│   └── ...
├── .env.local            # Environment variables (local development)
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # Project README file
⚙️ Getting StartedFollow these steps to set up and run the project locally.PrerequisitesNode.js (v18 or higher recommended)npm or YarnMongoDB Atlas account (or a local MongoDB instance)ImgBB API Key (for image uploads)Google & GitHub OAuth Credentials (for social login)InstallationClone the repository:git clone <repository_url>
cd next-js-college-booking
Install dependencies:npm install
# or
yarn install
Environment VariablesCreate a .env.local file in the root of your project and add the following environment variables. Replace the placeholder values with your actual credentials.# MongoDB Connection
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/college-db?retryWrites=true&w=majority&appName=Cluster0
DB_NAME=college-db

# NextAuth.js Configuration
NEXTAUTH_SECRET=a_long_random_string_for_nextauth_secret # Generate a strong secret
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GITHUB_ID=YOUR_GITHUB_ID
GITHUB_SECRET=YOUR_GITHUB_SECRET

# Email Service (for password reset)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password # Use an app password if using Gmail
EMAIL_FROM=your_email@gmail.com

# ImgBB API Key for Image Uploads
IMGBB_API_KEY=YOUR_IMGBB_API_KEY

# Application Base URL (for local development)
APP_BASE_URL=http://localhost:3000
NEXT_API_URL=http://localhost:3000
MONGODB_URI: Get this from your MongoDB Atlas cluster. Ensure college-db is the database name.NEXTAUTH_SECRET: Generate a strong random string (e.g., using openssl rand -base64 32).GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET: Obtain from Google Cloud Console (OAuth 2.0 Client IDs).GITHUB_ID, GITHUB_SECRET: Obtain from GitHub Developer Settings (OAuth Apps).EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD: Your email credentials for sending password reset emails. For Gmail, you'll need to generate an App Password.IMGBB_API_KEY: Get this from ImgBB API.Running the Development Servernpm run dev
# or
yarn dev
Open http://localhost:3000 in your browser to see the application.Building for Productionnpm run build
# or
yarn build
Running in Production Modenpm run start
# or
yarn start
🔑 Test User CredentialsYou can use the following credentials to test the login and registration functionality:Email: testuser@example.comPassword: password123Feel free to register new accounts using the registration form.🚀 DeploymentThis project is configured for deployment on Vercel.Important for Vercel Deployment:Ensure all environment variables listed in the "Environment Variables" section above are also configured in your Vercel project settings (Project Settings > Environment Variables). For NEXT_API_URL and APP_BASE_URL, set their values to your Vercel deployment URL (e.g., https://your-project-name.vercel.app).🎨 UI InspirationThe UI design draws inspiration from:https://livi.wpengine.com/🤝 ContributingFeel free to fork the repository, open issues, or submit pull requests.📄 LicenseThis project is open-source and available under the MIT License.Next.js College Booking - Find