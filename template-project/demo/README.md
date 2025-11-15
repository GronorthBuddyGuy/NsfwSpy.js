# ML Classifier Demo

Interactive React demo application for the ML Classifier library.

## Live Demo

Visit [https://your-username.github.io/your-repo](https://your-username.github.io/your-repo)

## Features

- Drag and drop image upload
- Real-time classification
- Model loading progress indicator
- Responsive design
- Mobile-friendly interface

## Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Deploy to GitHub Pages

```bash
npm run deploy
```

Deploys the production build to GitHub Pages.

## Configuration

### Update Model Path

Edit `src/App.tsx` to point to your model location:

```typescript
const classifier = new MLClassifier("./model/model.json");
```

### Update Homepage

Edit `package.json`:

```json
{
  "homepage": "https://your-username.github.io/your-repo"
}
```

## Project Structure

```
demo/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   └── Logo/
│   ├── functions/
│   │   ├── selectFiles.ts
│   │   └── sortBy.ts
│   ├── models/
│   │   └── ImageFile.ts
│   ├── App.tsx
│   ├── App.scss
│   ├── index.tsx
│   └── index.css
└── package.json
```

## Customization

### Update Colors

Edit `src/App.scss` to change the color scheme:

```scss
.secondary {
    color: #ffa31a; // Change this
}
```

### Update Logo

Edit `src/components/Logo/Logo.tsx`:

```tsx
<span className="primary">Your</span>
<span className="secondary">Logo</span>
```

## License

MIT
