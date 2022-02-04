import "./App.css";
import Feed from "./components/Feed";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";

function App() {
    return (
        <div className="App">
            {/*<SignUp/>*/}
            <Header />
            <Feed />
            {/* <Profile /> */}
        </div>
    );
}

export default App;
