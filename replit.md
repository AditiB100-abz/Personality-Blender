# Personality Blender - Project Documentation

## Overview
An interactive web application where users select personality traits via drag-and-drop, trigger an animated blender with sound effects, and receive AI-generated drink results with detailed flavor profiles.

## Features Completed
- **Drag-and-drop trait selection**: Users select 4-5 traits from 20 options
- **Animated blender**: 1.5s shake animation with Web Audio API sound effects
- **Starbucks-inspired design**: Warm cream background, light sage green cards, Starbucks green accents
- **AI-generated drink results**: Mock AI responses with personalized drink names, descriptions, and flavor profiles
- **Temperature-accurate drink images**: 10 generated images showing iced (with ice/frost) and hot (with steam) drinks
- **Shareable results**: 
  - Downloadable PNG card of the drink
  - Summary PNG with drink image, name, description, flavor profile, notes, and personality explanation
  - Modal preview before download
  - Share functionality

## Design System
- **Background**: Warm cream (#f3f0e9)
- **Interior Elements**: Light sage green (HSL: 157 45% 93%)
- **Primary Accent**: Starbucks green (#00704A)
- **Typography**: Montserrat (headings), Open Sans (body)
- **Dark Mode**: Fully supported with CSS variables

## Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js
- **Routing**: Wouter
- **State Management**: TanStack React Query
- **Animation**: Framer Motion
- **Audio**: Web Audio API
- **Image Generation**: HTML Canvas, html2canvas
- **PDF/PNG Export**: jsPDF, canvas-to-blob

## GitHub Integration
- GitHub connector has been set up via Replit integrations
- Backend route `/api/push-to-github` available to create and push repository
- Uses Octokit REST client for GitHub operations
- Supports automatic repository creation and code pushing

## Key Files
- `client/src/components/PersonalityBlender.tsx`: Main component with drag-and-drop
- `client/src/components/ResultCard.tsx`: Result display with download functionality
- `client/src/components/BlenderContainer.tsx`: Animated blender with sound
- `client/src/lib/drinkGenerator.ts`: Mock AI drink generation
- `server/github.ts`: GitHub integration helper functions
- `server/routes.ts`: Backend API routes
- `client/src/index.css`: Design system CSS variables
- `design_guidelines.md`: Frontend design specifications

## Recent Changes
- Added GitHub integration support
- Created backend route for pushing repository to GitHub
- Summary PNG now includes generated drink image
- Download modal preview for summary before downloading

## User Preferences
- Prefers downloadable PNG summaries over PDFs
- Wants summarized results with drink images included
- Wants GitHub integration for code backup
