import { Routes, Route } from "react-router-dom";
import AuroraBackgroundLayout from "./layout/AuroraBackgroundLayout";
import Home from "./pages/Home";
import { MusicPage } from "./pages/MusicPage";
import { LoginForm } from "./components/LoginForm";
import { MusicPlaybackPage } from "./pages/MusicPlaybackPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuroraBackgroundLayout />}>
        <Route index element={<Home />} />

        <Route path="/music" element={<MusicPage />} />

        <Route
          path="/music/playback/:music_id"
          element={<MusicPlaybackPage />}
        />
        <Route path="/login" element={<LoginForm />} />
        {/* Otras rutas que compartirán el mismo Layout */}
        {/* <Route path="/playlist" element={<PlaylistPage />} /> */}
        {/* <Route path="/sync-room/:id" element={<SyncRoomPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
