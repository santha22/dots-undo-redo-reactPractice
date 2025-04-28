import "./styles.css";

export default function App() {
  const [points, setPoints] = useState([]);
  const [queue, setQueue] = useState([]);

  const handleClick = (e) => {
    setPoints((pointPreviousState) => [
      ...pointPreviousState,
      [e.clientX, e.clientY],
    ]);
  }

  const handleUndo = (e) => {
    e?.stopPropagation();
    const lastCircle = points[points.length - 1];
    const newPoints = points.slice(0, points.legnth - 1);
    setPoints(newPoints);
    setQueue([...queue, lastCircle]);
  };

  const handleRedo = (e) => {
    e?.stopPropagation();
    const firstCircle = queue[0];
    setPoints([...points, firstCircle]);
    setQueue([...queue.splice(1)]);
  };

  return (
    <div className="App"
      style={{width: '100vw', height: '100vh'}}
      onClick={handleClick}
    >
      <button 
        onClick={handleUndo}
        disabled={points.length === 0}
        style={{width: '100px', height: '20px', marginRight: '20px'}}
      >
        {" "}
        Undo{" "}
      </button>
      <button 
        onClick={handleRedo}
        disabled={queue.length === 0}
        style={{ width: '100px', height: '20px'}}
      >
        Redo
      </button>

      {points.map((point) => (
        <div
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            backgroundColor: 'black',
            borderRadius: '100%',
            top: point[1],
            left: point[0]
          }}
        >
        </div>
      ))}
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
