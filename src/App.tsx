import FileUpload from "./Components/FileUpload";
import CompareColumn from "./Components/CompareColumn";
import Counter from "./features/counter/Counter";
function App() {
    return (
        <div className="App">
            <Counter />
            {/* <FileUpload /> */}
            <CompareColumn />
        </div>
    );
}

export default App;
