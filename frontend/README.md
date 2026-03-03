# QuickHire Frontend

React-based job application platform frontend built with TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library + fast-check
- **Fonts**: Clash Display, Epilogue, Red Hat Display

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies (from root)
npm install

# Or install from frontend directory
cd frontend
npm install
```

### Development

```bash
# Start dev server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # QH-prefixed reusable UI components
│   │   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   │   ├── features/        # Feature-specific components
│   │   └── common/          # Shared components
│   ├── pages/               # Page components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API service layer
│   ├── types/               # TypeScript types
│   ├── constants/           # Constants and text content
│   ├── utils/               # Utility functions
│   ├── test/                # Test setup
│   └── styles/              # Global styles
├── tests/
│   └── properties/          # Property-based tests
└── public/                  # Static assets
```

## Path Aliases

The project uses path aliases for cleaner imports:

- `@/*` - src directory
- `@/components/*` - components directory
- `@/pages/*` - pages directory
- `@/hooks/*` - hooks directory
- `@/services/*` - services directory
- `@/types/*` - types directory
- `@/constants/*` - constants directory
- `@/utils/*` - utils directory

## Design System

### Colors

- Primary: `#4640DE`
- Secondary: `#CCCCF5`
- Tertiary: `#E9EBFD`
- Background: `#F8F8FD`
- Neutrals: 900, 700, 600, 500, 300
- Accents: blue, green, yellow, red, purple

### Typography

- Headings: Clash Display (weight 600)
- Body: Epilogue (weights 400, 500, 600, 700)
- Logo: Red Hat Display (weight 700)

### Font Sizes

- H1: 72px / 110%
- H2: 48px / 110%
- Body Large: 18px / 160%
- Body Normal: 16px / 160%
- Body Small: 14px / 160%

## Testing

The project uses a dual testing approach:

- **Unit Tests**: Specific examples and edge cases using Vitest and React Testing Library
- **Property Tests**: Universal properties across all inputs using fast-check (minimum 100 iterations)

## Code Quality

- Strict TypeScript mode enabled
- ESLint for code linting
- Prettier for code formatting (configured at workspace root)
- No implicit `any` types allowed

## Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## License

MIT
