## Video Reference (Loom)
- [Loom Video](https://www.loom.com/share/0b59ee2a1b72490fb3818a45b3fc0219)

## Features

- **Remix**: A powerful framework for building modern web applications.
- **Vite**: A fast build tool that enhances the development experience.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Shadcn**: A collection of reusable components and utilities to speed up your development.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, use the following command:

```bash
npm run dev
```

**Note:** This command will execute `clear` to clear the terminal screen before starting the development server. On Windows, you should modify this to `cls` to ensure compatibility. 

Here's how you can adjust it:

- On **Windows**, replace `clear` with `cls` in your `package.json` scripts.

  **package.json** example:

  ```json
  {
    "scripts": {
      "dev": "cls && remix vite:dev"
    }
  }
  ```

- On **Unix-based systems** (Linux, macOS), you can use:

  **package.json** example:

  ```json
  {
    "scripts": {
      "dev": "clear && remix vite:dev"
    }
  }
  ```