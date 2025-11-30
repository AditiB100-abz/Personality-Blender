# Personality Blender - Design Guidelines

## Design Approach
Reference-based design inspired by **Starbucks' coffeehouse aesthetic** - warm, inviting, premium yet accessible. Think cozy café atmosphere translated into digital experience.

## Color System
- **Primary Green**: #00704A (Starbucks signature - buttons, accents, blender)
- **Light Sage Green**: Lighter aesthetic Starbucks green - used for interior box backgrounds (cards, containers)
- **Warm Cream Background**: Neutral cream tones for main app background - creates warm, welcoming atmosphere
- **Dark Forest**: #1E3932 (primary text, headings)
- **Coffee Brown**: #8B4513 (secondary accents, borders)
- **Pure White**: #FFFFFF (premium touches, highlights)

## Typography
- **Primary Font**: Montserrat (headings, buttons, trait labels) - weights: 600, 700
- **Secondary Font**: Open Sans (body text, descriptions) - weights: 400, 600
- **Hierarchy**: 
  - Hero/Title: 2.5rem - 3rem (Montserrat Bold)
  - Section Headers: 1.75rem - 2rem (Montserrat SemiBold)
  - Trait Cards: 1rem (Montserrat SemiBold)
  - Body Text: 1rem (Open Sans Regular)
  - Flavor Details: 0.875rem (Open Sans Regular)

## Layout System
- **Spacing Scale**: Use Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm
- **Container**: max-w-6xl for main content, max-w-4xl for result cards
- **Card Padding**: p-6 to p-8 for trait cards, p-8 to p-12 for result cards
- **Section Spacing**: py-12 to py-16 between major sections

## Component Library

### Home Screen
- Centered welcome card with Starbucks-oriented logo/title area
- Brief tagline explaining the experience
- Large "Start Blending" CTA button (primary green with gold hover state)
- Subtle coffee-themed decorative elements or icon

### Trait Selection Interface
- **Grid Layout**: 4-column grid (lg), 3-column (md), 2-column (sm) for 20 personality traits
- **Trait Cards**: Light sage green background, rounded-lg (12px), shadow-md, 8px padding, hover lift effect (translate-y-1), cursor-grab when draggable
- **Card Content**: Icon or emoji representation, trait name in Montserrat SemiBold
- **Visual States**: 
  - Default: light sage green background, subtle border
  - Dragging: opacity-50, scaled down
  - Disabled (after 5 selected): opacity-40, cursor-not-allowed

### Blender Container
- **Position**: Centered below trait grid, fixed height container
- **Visual Design**: Illustrated/icon blender shape in primary green, cream interior
- **Drop Zone**: Dashed border when empty, solid when contains traits, minimum 200px height
- **Selected Traits Display**: Stack selected traits inside blender with remove (×) button
- **Validation Indicator**: Text showing "X of 4-5 traits selected" with color coding (red when <4, green when 4-5)

### Blend Button
- Large, prominent button below blender
- Primary green background (#00704A), white text with Starbucks-oriented styling
- Disabled state when <4 or >5 traits (opacity-50, cursor-not-allowed)
- Active state: triggers animation immediately

### Blender Animation
- 1.5-second shake/spin CSS animation (rotation + translate)
- Pulsing or glowing effect during blend
- Blender sound effect plays during blend animation (1.5s duration)

### Result Card
- **Layout**: Single centered card (max-w-2xl), light sage green background, generous padding (p-10)
- **Drink Name**: Large heading (2rem, Montserrat Bold, dark forest color)
- **Drink Description**: 2-3 sentence tagline (Open Sans, 1.125rem)
- **Flavor Profile Section**:
  - Grid layout (2 columns on desktop, 1 on mobile)
  - Temperature, Sweetness, Intensity, Notes as labeled items
  - Visual indicators: badge-style pills in warm gold with icons
- **Personality Match Explanation**: 
  - Bordered section with light sage green background
  - "Why This Drink?" heading
  - 3-4 sentences connecting traits to drink characteristics
- **Action Buttons**: 
  - "Blend Again" (primary green, full width on mobile, inline on desktop)
  - "Share Result" (outline button, primary green border)

## Branding & Logo
- **Starbucks-Oriented Styling**: Use Starbucks green (#00704A) as primary brand color
- **Coffee-Themed Icons**: Leverage coffee cup, coffee bean, and blender icons to reinforce brand identity
- **Premium Aesthetic**: Light sage green cards against warm cream background creates elegant, premium feel
- **Consistency**: Apply Starbucks-inspired design language throughout UI for cohesive brand experience

## Interactions & Animations
- **Drag Feedback**: Smooth cursor changes, visual lift on hover, opacity change during drag
- **Drop Feedback**: Subtle scale pulse when trait drops into blender
- **Button Hovers**: Gentle color darkening, no dramatic transforms
- **Page Transitions**: Fade between home → selection → results (300ms ease)
- **Micro-animations**: Minimize - only where enhancing usability (validation feedback, drop confirmation)

## Responsive Behavior
- **Mobile (<768px)**: Single column trait grid, stack all elements vertically, full-width buttons
- **Tablet (768-1024px)**: 2-3 column trait grid, maintain blender prominence
- **Desktop (>1024px)**: 4-column trait grid, side-by-side result sections

## Accessibility
- All interactive elements have visible focus states (ring-2 ring-offset-2 ring-primary)
- Trait cards have aria-labels describing drag functionality
- Color contrast meets WCAG AA standards (dark text on light backgrounds)
- Keyboard navigation support for all drag-drop actions (spacebar to pick/drop)

## Images
No hero images needed - this is an interactive application focused on the blending experience itself. The visual interest comes from the illustrated blender component, trait cards, and result displays rather than photographic imagery.
