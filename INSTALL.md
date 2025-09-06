# 🚀 Quick Start Guide for Windows

## Prerequisites

### Step 1: Install Node.js
1. Download Node.js from [https://nodejs.org](https://nodejs.org)
2. Choose the **LTS version** (recommended for most users)
3. Run the installer and follow the setup wizard
4. **Important**: Make sure to check "Add to PATH" during installation

### Step 2: Verify Installation
Open **Command Prompt** or **PowerShell** and run:
```bash
node --version
npm --version
```
You should see version numbers for both commands.

## 🔧 Installation & Setup

### Option 1: Download ZIP (Easiest)
1. Download the project as ZIP from GitHub
2. Extract to your desired folder (e.g., `C:\Projects\osint-matrix`)
3. Open **Command Prompt** or **PowerShell**
4. Navigate to the project folder:
   ```bash
   cd C:\Projects\osint-matrix
   ```

### Option 2: Git Clone
```bash
git clone <repository-url>
cd osint-matrix
```

### Step 3: Install Dependencies
```bash
npm install
```
This will download all required packages (may take 2-3 minutes).

### Step 4: Start Development Server
```bash
npm run dev
```

The application will automatically open in your default browser at `http://localhost:8080`

## 🎯 Available Commands

```bash
# Development server (with auto-reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run code linting
npm run lint
```

## 🛠️ Troubleshooting

### Port Already in Use
If port 8080 is busy, the app will automatically use the next available port.

### Permission Issues
Run Command Prompt as Administrator if you encounter permission errors.

### Node.js Version Issues
Make sure you're using Node.js version 16 or higher:
```bash
node --version
```

### Firewall/Antivirus
Some antivirus software may block the development server. Add an exception for Node.js if needed.

## 📁 Project Structure
```
osint-matrix/
├── src/              # Source code
├── public/           # Static assets
├── dist/             # Production build (after npm run build)
├── node_modules/     # Dependencies (auto-generated)
└── package.json      # Project configuration
```

## 🌐 Browser Support
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

## 💡 Tips for Windows Users
- Use **PowerShell** or **Windows Terminal** for better experience
- Consider installing **Git for Windows** for version control
- **VS Code** is recommended as the code editor
- The app will hot-reload automatically when you save changes