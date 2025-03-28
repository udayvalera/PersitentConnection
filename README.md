# Persistent File Processing with React & Express

This is a simple MERN (MongoDB, Express, React, Node.js) application that demonstrates persistent file processing. Users can upload a file (simulated), and the backend processes it with a **30-second delay** while allowing users to navigate between pages without losing the upload status.

## Features

- ✅ **Simulated File Upload** – No actual file storage; backend simulates a delay.
- ✅ **Persistent Processing** – Upload continues even if users navigate between pages.
- ✅ **Real-Time Status Updates** – Fetches the latest processing status every few seconds.
- ✅ **Local Storage Integration** – Ensures status persistence across navigation.

## Tech Stack

### **Frontend (React)**

- React Router for navigation
- `useEffect` and `useState` for state management
- `fetch` for API calls

### **Backend (Express & Node.js)**

- Express.js for API handling
- In-memory storage for tracking uploads
- Simulated delay with `setTimeout`

## Installation & Setup

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/udayvalera/PersistentConnection.git
cd PersistentConnection
```

### 2️⃣ **Install Dependencies**

#### Install frontend dependencies

```sh
cd client
npm install
```

#### Install backend dependencies

```sh
cd ../server
npm install
```

### 3️⃣ **Run the Application**

#### Start the backend

```sh
cd server
npm start
```

#### Start the frontend

```sh
cd ../client
npm start
```

🚀 Your app should now be running at **http://localhost:3000**

## API Endpoints

| Method | Endpoint      | Description                 |
| ------ | ------------- | --------------------------- |
| POST   | `/upload`     | Starts the simulated upload |
| GET    | `/status/:id` | Gets the processing status  |

## Project Structure

```
/persistent-upload
│── /client        # React frontend
│── /server        # Express backend
│── README.md      # Project documentation
```

## Screenshots

### 📌 **Home Page**

- Displays the current upload status
- Allows navigation to the Upload page

### 📌 **Upload Page**

- Simulates a file upload process
- Disables upload button during processing
- Shows status updates

## How to Use in an Actual Use Case

### **Scenario: Document Processing System**

If you want to use this system for actual file processing, follow these steps:

1. **Modify the Backend**

   - Instead of simulating a delay, integrate an actual file processing system.
   - Example: Convert uploaded PDFs to text using `pdf-parse`.

2. **Update the Frontend**

   - Allow real file uploads using `FormData`.
   - Example: Implement a file input field with a progress bar.

3. **Persist Processing Across Sessions**

   - Store ongoing process details in a database (MongoDB, PostgreSQL, etc.).
   - Fetch status updates from the database instead of in-memory storage.

4. **Deploy the Application**

   - Host the frontend on **Vercel** or **Netlify**.
   - Deploy the backend on **Render**, **Heroku**, or a VPS.

5. **Enhance with WebSockets**
   - Use **Socket.io** to push real-time updates instead of polling.
   - This makes status updates faster and reduces API requests.

By following these steps, you can adapt this project into a real-world application for handling file uploads and processing workflows efficiently.

## Contributing

Feel free to fork this repo, create a branch, and submit a pull request if you want to improve this project!

## License

This project is licensed under the MIT License.
