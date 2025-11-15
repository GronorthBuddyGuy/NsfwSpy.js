import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Logo } from './components/Logo/Logo';
import { selectFiles } from './functions/selectFiles';
import { ImageFile } from './models/ImageFile';
import './App.scss';
import { sortResults } from './functions/sortBy';
import { MLClassifier, ClassificationResult } from '@your-scope/browser';

// Initialize classifier with model path
const classifier = new MLClassifier("./model/model.json");

export const App: React.FC = () => {
    const [image, setImage] = useState<ImageFile>();
    const [imageResults, setImageResults] = useState<ClassificationResult>();
    const [processing, setProcessing] = useState<boolean>(false);
    const [status, setStatus] = useState("");

    // Load model on component mount
    useEffect(() => {
        const loadModel = async () => {
            try {
                await classifier.load({
                    onProgress: (progress) => setStatus(`Model loading... ${(progress * 100).toFixed(2)}%`)
                });
                setTimeout(() => {
                    setStatus("");
                }, 1000);
            } catch (error) {
                setStatus("Failed to load model");
                console.error("Model loading error:", error);
            }
        };

        loadModel();

        // Cleanup on unmount
        return () => {
            classifier.dispose();
        };
    }, []);

    const selectFile = () => {
        selectFiles({ accept: 'image/*', multiple: false }).then(async files => {
            if (files) {
                handleFile(files[0]);
            }
        });
    }

    const handleFile = async (file: Blob) => {
        const imageFile: ImageFile = {
            file: file,
            url: URL.createObjectURL(file)
        };

        // Clear previous results
        setImage(undefined);
        setImageResults(undefined);

        const fileType = imageFile.file.type;

        setProcessing(true);
        if (fileType.startsWith("image/")) {
            setImage(imageFile);
            try {
                const bitmap = await createImageBitmap(imageFile.file);
                const result = await classifier.classifyImage(bitmap);
                setImageResults(result);
            } catch (error) {
                console.error("Classification error:", error);
                setStatus("Failed to classify image");
            }
        }
        setProcessing(false);
    }

    // Sort results by probability
    let sortedImageResults: [string, any][] | undefined = undefined;
    if (imageResults) {
        sortedImageResults = sortResults(imageResults);
    }

    return (
        <div className="app">
            <header>
                <Logo />
            </header>
            <main>
                <section className="image-section">
                    <div className="image-canvas" onClick={selectFile}>
                        {!image &&
                            <>
                                <div className="upload-text">
                                    Click to select an image
                                </div>
                                <div className="icons">
                                    <div><FontAwesomeIcon icon={faImage} /></div>
                                </div>
                            </>}
                        {image &&
                            <img src={image.url} className="image-preview" alt="Selected" />}
                    </div>
                </section>
                <section className="results-section">
                    {status &&
                        <div className="status-message">
                            {status}
                        </div>}
                    {processing &&
                        <div className="processing-message">
                            Processing image...
                        </div>}
                    {sortedImageResults &&
                        <div className="results-container">
                            <h3>Classification Results</h3>
                            {sortedImageResults.map((result, index) =>
                                <div key={index} className={`result-value ${result[0]}`}>
                                    <span className="result-label">{result[0]}</span>
                                    <span className="result-probability">{(result[1] * 100).toFixed(2)}%</span>
                                </div>
                            )}
                        </div>}
                </section>
            </main>
        </div>
    );
}

export default App;
