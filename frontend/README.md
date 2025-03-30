# Gifty - AI-Powered Gift Finder

Gifty is a web application that helps users find the perfect gift for their loved ones using AI-powered recommendations. The application takes into account the recipient's age, hobbies, interests, occasion, and budget to suggest personalized gift ideas.

## Features

- Personalized gift recommendations based on recipient's preferences
- User-friendly interface with a modern design
- Budget-friendly suggestions
- Integration with multiple product platforms
- Easy-to-use gift finder form

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js with Express
- Database: MongoDB
- AI: OpenAI API for gift recommendations

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- OpenAI API key

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd Gifty
```

2. Set up the backend:

```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

4. Set up the frontend:

```bash
cd ../frontend
npm install
```

5. Start the backend server:

```bash
cd ../backend
npm run dev
```

6. Start the frontend development server:

```bash
cd ../frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
Gifty/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.js
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
