function EntityIdentification() {
    const [response, setResponse] = useState("Click upload for test ")
    const [src, setSrc] = useState("");

    function identifyFromFile(event) {
        setResponse('searching...');
        
        const { target: { files } } = event;
        const [file,] = files || [];

        if (!file) {
        return;
        }
        Predictions.identify({
        entities: {
            source: {
            file,
            },
            /**For using the Identify Entities advanced features, enable collection:true and comment out celebrityDetection
             * Then after you upload a face with PredictionsUpload you'll be able to run this again
             * and it will tell you if the photo you're testing is in that Collection or not and display it*/
            //collection: true
            celebrityDetection: true
        }
        }).then(result => {
        console.log(result);
        const entities = result.entities;
        let imageId = ""
        let names = ""
        entities.forEach(({ boundingBox, metadata: { name = "", externalImageId = "" } }) => {
            const {
            width, // ratio of overall image width
            height, // ratio of overall image height
            left, // left coordinate as a ratio of overall image width
            top // top coordinate as a ratio of overall image heigth
            } = boundingBox;
            imageId = externalImageId;
            if (name) {
            names += name + " .";
            }
            console.log({ name });
        })
        if (imageId) {
            Storage.get("", {
            customPrefix: {
                public: imageId
            },
            level: "public",
            }).then(setSrc); // this should be better but it works
        }
        console.log({ entities });
        setResponse(names);
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="Text">
        <div>
            <h3>Entity identification</h3>
            <input type="file" onChange={identifyFromFile}></input>
            <p>{response}</p>
            { src && <img src={src}></img>}
        </div>
        </div>
    );
    }

    function PredictionsUpload() {
        /* This is Identify Entities Advanced feature
        * This will upload user images to the appropriate bucket prefix
        * and a Lambda trigger will automatically perform indexing
        */
    function upload(event) {
        const { target: { files } } = event;
        const [file,] = files || [];
        Storage.put(file.name, file, {
        level: 'protected',
        customPrefix: {
            protected: 'protected/predictions/index-faces/',
        }
        });
    }

    return (
        <div className="Text">
        <div>
            <h3>Upload to predictions s3</h3>
            <input type="file" onChange={upload}></input>
        </div>
        </div>
    );
}