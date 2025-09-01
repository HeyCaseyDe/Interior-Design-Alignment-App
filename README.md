# Prouvé Interior Design Alignment App - Prototype

A comprehensive prototype showcasing the complete client-designer workflow for interior design preference capture and concept development.

## 🏠 About Prouvé

Prouvé streamlines how clients and designers align on interior design preferences. The app captures client style choices through structured workflows and transforms them into actionable design briefs for professional designers.

## 🚀 Live Demo

The prototype is running at: **http://localhost:3000**

## ✨ Key Features Implemented

### **Client Experience**
- **Onboarding Flow**: Simple form with magic link authentication simulation
- **Lifestyle Questionnaire**: Optional preference capture for budget, lifestyle, and style indicators  
- **Phase 1 - Style Discovery**: 
  - Image selection from curated boards (5 boards × 6 images per space)
  - AI-powered tag preference capture (like/dislike elements)
  - Drag-and-drop ranking interface
  - Inspiration image upload with mock AI tagging
- **AI-Generated Design Dossier**: Personalized design brief with regeneration options
- **Phase 2 - Concept Review**: Rating and feedback on designer-generated concepts
- **Phase 3 - Final Design**: Approval workflow for refined designs
- **Project Completion**: Final design package delivery

### **Admin Dashboard**
- **Three-Panel Layout**: Projects navigation, client input context, AI assistant
- **Project Management**: Multiple project states and status tracking
- **Client Input Review**: Design dossier, selections, and uploaded inspiration
- **Board Management**: Image curation and tagging workflow
- **Image Generation Workflow**: Mock AI generation with draft/published states
- **Publishing Controls**: Client-visible vs. internal draft management

### **Core Workflows**
- **Complete User Journey**: From onboarding through final design approval
- **Data Persistence**: LocalStorage-based state management for demo purposes  
- **Status Flow Management**: Automated project progression through phases
- **Mock Notifications**: Simulated email/SMS alerts for phase transitions

## 🛠 Technical Implementation

### **Technology Stack**
- **Frontend**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context + LocalStorage
- **Images**: Picsum Photos for consistent placeholder images
- **UI Components**: Custom components with Headless UI and Heroicons

### **Architecture**
- **Types-First Development**: Comprehensive TypeScript interfaces
- **Component-Based**: Reusable UI components and layouts  
- **Mock Data Layer**: Realistic data structures for all entities
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🎯 User Flow Demo

### **Client Journey**
1. **Start**: Visit `http://localhost:3000`
2. **Onboard**: Fill out basic info (Name: "Sarah", Email: "test@example.com")
3. **Lifestyle**: Complete optional questionnaire
4. **Style Discovery**: 
   - Navigate through 7 spaces (Kitchen, Bedroom, Bathroom, etc.)
   - Select 1 image per board (5 boards per space)
   - Tag elements you like/dislike
   - Rank your selections via drag-and-drop
   - Upload inspiration images (optional)
5. **Design Dossier**: Review AI-generated design brief and submit
6. **Status Page**: Click "Simulate Phase 2 Ready" to progress
7. **Concept Review**: Rate and provide feedback on design concepts
8. **Final Review**: Approve refined designs
9. **Completion**: Receive final design package

### **Admin Experience**
1. **Visit**: `http://localhost:3000/admin`
2. **Project Management**: View client projects and status
3. **Client Input**: Review design dossiers and preferences  
4. **Board Management**: Manage image collections
5. **Image Generation**: Create and publish concepts

## 📱 Key Screens & Components

- **`/`** - Client onboarding with form validation
- **`/lifestyle`** - Optional lifestyle questionnaire  
- **`/spaces`** - Space selection overview with progress tracking
- **`/spaces/[spaceId]`** - Image selection and tagging interface
- **`/spaces/[spaceId]/ranking`** - Drag-and-drop ranking
- **`/spaces/[spaceId]/upload`** - Inspiration image upload
- **`/dossier`** - AI-generated design brief with regeneration
- **`/status`** - Project status and phase progression
- **`/concept-review`** - Phase 2 concept feedback  
- **`/final-review`** - Phase 3 design approval
- **`/complete`** - Project completion and package delivery
- **`/admin`** - Three-panel admin dashboard

## 💾 Data Persistence

The prototype uses LocalStorage to simulate database persistence:
- **User Profile**: `currentUser`, `currentProject`  
- **Selections**: `userSelections`, `spaceRankings`, `uploadedImages`
- **Feedback**: `phase2Feedback`, `phase3Feedback`, `approvedImages`
- **Dossier**: `designDossier`

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue (600/700) - Actions and navigation
- **Success**: Green (500/600) - Completions and approvals  
- **Warning**: Yellow/Amber - Pending states
- **Error**: Red (500/600) - Negative feedback
- **Neutral**: Gray scales for text and backgrounds

### **Typography**
- **Font**: Inter (clean, modern, highly readable)
- **Hierarchy**: Consistent heading and body text scales
- **Interactive Elements**: Clear hover states and focus indicators

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Navigate to project directory
cd "prouve-app"

# Install dependencies  
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server  
npm start

# Linting
npm run lint
```

## 📋 Prototype Scope & Limitations

### **What's Included**
✅ Complete client workflow from onboarding to completion  
✅ Comprehensive admin dashboard with three-panel layout  
✅ Realistic data structures and user interactions  
✅ Responsive design across desktop and mobile  
✅ Form validation and error handling  
✅ Mock AI features (dossier generation, tagging)  
✅ File upload simulation with image previews  
✅ Status management and workflow progression  

### **Prototype Limitations**  
❌ No real authentication or user management  
❌ No actual AI integration (ChatGPT, image generation)  
❌ No real file storage or processing  
❌ No email/SMS notifications (simulated with alerts)  
❌ No database persistence (uses LocalStorage)  
❌ No payment processing or e-commerce features  

## 🔮 Next Phase Recommendations

### **MVP Development**
1. **Authentication**: Implement NextAuth.js with magic links
2. **Database**: PostgreSQL with Prisma ORM  
3. **File Storage**: AWS S3 integration
4. **AI Integration**: OpenAI GPT-4 and DALL-E 3
5. **Notifications**: SendGrid/Resend + Twilio
6. **Admin Features**: Real image generation and management

### **Production Considerations** 
1. **Performance**: Image optimization and lazy loading
2. **Security**: Input sanitization and file upload validation  
3. **Scalability**: Database indexing and caching strategies
4. **Monitoring**: Error tracking and analytics
5. **Testing**: Unit, integration, and E2E test suites

## 👥 Stakeholder Review Guide

### **Demo Script** (15-20 minutes)
1. **Client Onboarding** (2 min) - Show ease of getting started
2. **Style Discovery** (5 min) - Demonstrate core preference capture  
3. **Design Dossier** (3 min) - AI-generated insights and regeneration
4. **Concept Review** (3 min) - Designer-client feedback loop
5. **Admin Dashboard** (5 min) - Designer workflow and project management
6. **Q&A** (5 min) - Address specific concerns or features

### **Key Discussion Points**
- Does the user experience align with your vision?
- Is the admin workflow intuitive for designers?  
- Are there missing features critical for your use case?
- How does this compare to your current process?
- What would you prioritize for the MVP development phase?

## 📞 Support & Feedback

For questions about this prototype or to discuss next steps:
- **Technical Questions**: Review code and architecture
- **Feature Requests**: Identify gaps or enhancements  
- **Business Logic**: Validate workflow assumptions
- **Design Feedback**: UI/UX improvements

---

*Built with ❤️ for Prouvé - Transforming interior design collaboration*
