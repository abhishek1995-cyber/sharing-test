import logo from './logo.svg';
import './App.css';

function App() {
  const images = [
    "https://crmstaging.vegrow.in/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNGYwQ2c9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--fc28245367740e0dde14bd61129cf83ce5c8de11/7ce2333d-99fe-4e43-add7-e010fc179ae5.png",
    "https://crmstaging.vegrow.in/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNGowQ2c9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--9efb289dddc2a6be4bdaf2ddf6941747498c11b1/61.Bill-Book-Invoice-Design.png",

    
  ]
  const amazonImages = [
   "https://dummyimage.com/qvga",
    'https://dummyimage.com/300.png/09f/fff'

  ]

  async function handleShare(event) {
    event.stopPropagation();

    try {
      const responses = await Promise.all(amazonImages.map((url) => fetch(url)));

      console.log(responses, "respopnses");

      // Fetch the image as a blob
      const blobs = await Promise.all(
        responses.map((response) => response.blob()),
      );

      console.log(blobs, "blob");
      const files = blobs.map(
        (blob, index) =>
          new File([blob], `shared-image-${index + 1}.jpg`, {
            type: blob.type,
          }),
      );

      console.log(files, "file");

      // Share using Web Share API
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Check out this image!",
            text: "Here's an image I wanted to share with you.",
            files: files,
          });
        } catch (shareError) {
          console.error("Error using Web Share API:", shareError);
          // Handle the case where Web Share API is not successful
        }
      } else {
        alert("Web Share API is not supported in this browser.");
      }
    } catch (error) {
      console.error("Error sharing images", error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleShare}>
          Share
        </button>
        {images.map((item) => {
          return (

            <img src={item} width="100%" height="100%" />
          )
        })}
      </header>
    </div>
  );
}

export default App;
