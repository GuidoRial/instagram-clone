import "./App.css";
import Feed from "./components/Feed";
import Header from "./components/Header";
import SignUp from "./components/SignUp";

function App() {
    return (
        <div className="App">
            {/*<SignUp/>*/}
            <Header />
            <Feed />
        </div>
    );
}

export default App;
