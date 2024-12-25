# Spy Game

A modern web-based implementation of the popular social deduction party game "Spyfall". In each round, players are secretly assigned locations, with one player designated as the spy. Through careful questioning and deduction, players must identify the spy while the spy tries to figure out the location.

## Features

- 3-10 players supported
- Multiple location lists (Default, Difficult, Fantasy)
- Customizable player names
- Built-in 5-minute timer
- Mobile-friendly design
- Clean, modern UI

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Firebase (Analytics)
- Shadcn UI Components

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/spygame.git
cd spygame
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to start playing.

## How to Play

Available on [My website](https://spy.jamiesteiner.com)

1. Enter the number of players (3-10)
2. Customize player names if desired
3. Optionally enable extended location lists
4. Start the game
5. Each player views their role/location privately
6. Use the 5-minute timer to play the round
7. Players take turns asking each other questions about the location
8. The spy tries to figure out the location while remaining undetected
9. Other players try to identify the spy through careful questioning

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details
