import React, { useEffect, useRef, useState } from "react";

import { Audio, Video } from "@huddle01/react/components";

import { usePeers } from "@huddle01/react/hooks";
import { useRecorder } from "@huddle01/react/app-utils";
import { useRouter } from "next/router";

const App = () => {
  const router = useRouter();

  const [roomId, setRoomId] = useState(router.query.roomId?.toString() || "");

  const { peers } = usePeers();

  useEffect(() => {
    setRoomId(router.query.roomId?.toString() || "");
  }, [router.query.roomId?.toString()]);

  useRecorder(roomId, process.env.NEXT_PUBLIC_PROJECT_ID || "");

  return (
    <div className="grid grid-cols-2">
      <div>
        Peers:
        <div className="grid grid-cols-4">
          {Object.values(peers)
            .filter((peer) => peer.cam)
            .map((peer) => (
              <Video
                key={peer.peerId}
                peerId={peer.peerId}
                track={peer.cam}
                // debug
              />
            ))}
          {Object.values(peers)
            .filter((peer) => peer.mic)
            .map((peer) => (
              <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
