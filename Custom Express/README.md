# 🌟 **COHORT JS Server** 🌟  
Welcome to **COHORT JS**, where simplicity meets elegance! This server is built using **Node.js** and the native `http` module, crafted with a blend of English and Hindi to give it a desi touch. 🚀

---

## 💡 **Features**
- Minimalistic HTTP server built from scratch.
- Supports **GET** and **POST** requests.
- Custom responses for different routes.
- Simple and clean code structure.
- Desi touch to make coding a bit more fun! 🇮🇳

---

## 🛠️ **Project Structure**
```
📁 Custom Express
├── cohort.js         # The server logic and configuration
└── index.js          # Entry point to start the server
```

---

## 🚀 **How to Run**

1. Make sure you have **Node.js** installed on your system.  
   You can check it with:
   ```bash
   node -v
   ```
   
2. Clone this repository or download the files.

3. Open your terminal and navigate to the project folder.

4. Run the server using:
   ```bash
   node index.js
   ```
   You should see:
   ```
   server chal raha hai 8000 pe
   ```
   
---

## 🌐 **Usage**

### GET Request (Home Route)  
- Endpoint: `http://localhost:8000/`  
- Response:  
  ```
  COHORT JS mein aapka swaagat hai
  ```
- Try it with:
  ```bash
  curl http://localhost:8000/
  ```

### POST Request (Post Route)  
- Endpoint: `http://localhost:8000/post`  
- Response:  
  ```
  server ye le lo mujhse data
  ```
- Try it with:
  ```bash
  curl -X POST http://localhost:8000/post
  ```

---

## 📂 **Code Explanation**

- **GET Requests:**  
  Handled by the `getCallPr()` function. Returns a friendly welcome message.

- **POST Requests:**  
  Handled by the `postCallPr()` function. Responds with a simple acknowledgment message.

- **Server Creation:**  
  The `serverBanao()` function sets up the server and listens for requests.

- **Start the Server:**  
  The `suno()` function initializes the server on the specified port and logs a message when ready.

---

## 🎉 **Why COHORT JS?**  
COHORT JS is all about blending **simplicity** with **fun**. The use of Hindi variable names and functions gives it a quirky, relatable vibe while maintaining clarity and performance. Give it a try and experience a new way of coding!

---

## 💬 **Feedback & Contributions**
Feel free to open issues or submit pull requests. Your suggestions are always welcome!

---

Made with ❤️ by a desi coder! 🇮🇳