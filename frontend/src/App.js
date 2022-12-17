import React, { useEffect, useReducer, useLayoutEffect, useRef, useState, useMemo } from "react";
import modeReducer from "./components/modeReducer.js";
import { AnimatePresence, AnimateSharedLayout, motion, useCycle } from "framer-motion";
import { v4 as uuid } from 'uuid';
import Konva from 'konva';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import NavBar from '@layouts/NavBar/NavBar.jsx';
import axios from 'axios'


// import socket io
// import io from 'socket.io-client';



export default function App() {



  // ue socket io to connect to server /


  // const socket = useMemo(() => io.connect('http://localhost:3000'), []);


  // socket.on('connect', (socket) => {
  //   console.log('a user connected');
  // });


  const stageRef = useRef('stage');
  const layerRef = useRef('layer');

  const [isDrawing, setIsDrawing] = useState(false);

  const [mongoData, setMongoData] = useState('');

  const [elements, setElements] = useState([]);

  const [deleted, setDeleted] = useState([]);

  const [mode, dispatch] = useReducer(modeReducer, '',);

  const [transformers, setTransformers] = useState([]);


  let layer = layerRef.current;
  let stage = stageRef.current


  let element;

  const createElement = (x, y) => {

    switch (mode) {
      case 'clear':
        console.log('clear')
        setElements([]);
        break;
      case 'selection':
        return
      case 'rectangle':
        element = new Konva.Rect({
          x: x,
          y: y,
          perfectDrawEnabled: true,
          stroke: 'black',
          strokeWidth: 3,
          draggable: false,
          id: uuid(),
        });
        return element;

      case 'arrow':
        element = new Konva.Arrow({
          points: [x, y],
          pointerLength: 10,
          pointerWidth: 10,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 3,
          draggable: true,
          id: uuid()
        });
        return element;

      default:
        element = new Konva.Ellipse({
          x: stage.getPointerPosition().x,
          y: stage.getPointerPosition().y,
          radiusX: 50,
          radiusY: 50,
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
          id: uuid()
        })

        return element;
    };

  }


  const handleLocalStorage = async (item) => {

    handleClear();
    const localStorageItemParsed = await JSON.parse(localStorage.getItem(item))[0]

    localStorageItemParsed.elements.forEach(element => {
      let json = element
      let shape = Konva.Node.create(json, 'container');
      layer.add(shape);
      stage.add(layer);
    });

    setElements(localStorageItemParsed.elements);




  }


  const [force, setForce] = useState(1);



  const handleMouseMove = (event) => {
    if (!isDrawing || mode === 'selection') {

      return;
    }

    var interpolatedElement = elements[elements.length - 1];

    switch (mode) {
      case 'rectangle':
        interpolatedElement.width(stageRef.current.getPointerPosition().x - interpolatedElement.x())
        interpolatedElement.height(stageRef.current.getPointerPosition().y - interpolatedElement.y())
        break;
      case 'arrow':
        interpolatedElement.points([interpolatedElement.points()[0], interpolatedElement.points()[1], stage.getPointerPosition().x, stage.getPointerPosition().y]);
        break;
      case 'ellipse':
        interpolatedElement.radiusX(stageRef.current.getPointerPosition().x - interpolatedElement.x())
        interpolatedElement.radiusY(stageRef.current.getPointerPosition().y - interpolatedElement.y())
        break;
      case 'line':
        interpolatedElement.points([interpolatedElement.points()[0], interpolatedElement.points()[1], stage.getPointerPosition().x, stage.getPointerPosition().y]);
        break;
      case 'text':
        interpolatedElement.text(stageRef.current.getPointerPosition().x - interpolatedElement.x())
        interpolatedElement.text(stageRef.current.getPointerPosition().y - interpolatedElement.y())
        break;
      default:
        return;
    }


  }



  const handleMouseDown = (mode) => {
    if (mode === 'selection') return;

    setIsDrawing(true);

    let { x, y } = stage.pointerPos;

    const element = createElement(x, y);

    //
    layer.add(element);
    stage.add(layer);

    setElements(prevState => [...prevState, element]);

  }


  const handleMouseUp = () => {
    setIsDrawing(false);

    // socket.emit('draw', 23);
    // socket.on('draw', (data) => {
    //   console.log(data)
    // })

    // socket.emit('sd', 'asdsd');



  }



  const handleClick = (e) => {
    let clickedOn = e.target;


    if (mode === 'selection' && clickedOn !== stage) {
      clickedOn.setAttrs({
        stroke: 'black',
        draggable: true,
      });

      if (transformers.includes(clickedOn)) {
        return;
      }

      addTransform(e);

    } else {
      removeTransformers()

    }

    if (clickedOn === stage) {
      console.log('stage')
      removeTransformers()
      disableDraggable();
    }


    console.log({ layer });
    console.log({ stage });

  }



  const removeTransformers = () => {
    console.log('being called');
    transformers.forEach((transformer) => {
      transformer.detach();
      transformer.forceUpdate();
    });
    setTransformers([]);
  };


  const handleForce = (e) => {
    setForce(1);
  }



  const handleClear = () => {
    console.log('clear')
    setElements([]);
    stage.clearCache();
    layer.clearCache();
    stage.clear();
    layer.destroy()

  }


  const handleUndo = (event) => {
    if (elements.length === 0) {
      return;

    } else {

      const lastElement = elements[elements.length - 1];

      setDeleted((prevState) => [...prevState, lastElement]);

      setElements(elements.filter(a => a !== lastElement));
      layer.children = layer.children.filter(a => a !== lastElement);
      layer.draw();
    }
  }


  const handleRedo = (event) => {
    if (deleted.length === 0) {
      return 1;
    }

    const putBack = deleted[deleted.length - 1];
    setDeleted(deleted.filter(a => a !== putBack));
    setElements((prevState) => [...prevState, putBack]);
    layer.children = [...layer.children, putBack];
    layer.draw();

  }



  const addTransform = (e) => {

    const tr = new Konva.Transformer({
      node: e.target,
      enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      rotateEnabled: true,
      borderStroke: 'black',
      borderStrokeWidth: 2,
      anchorStroke: 'black',
      anchorStrokeWidth: 2,
      anchorFill: 'white',
      anchorSize: 10,
      keepRatio: false,
      ignoreStroke: true,
      boundBoxFunc: function (oldBox, newBox) {
        // limit resize
        if (newBox.width < 5 || newBox.height < 5) {
          return oldBox;
        }
        return newBox;
      }
    });
    layer.add(tr);
    tr.moveToTop();
    layer.draw();

    setTransformers((prevState) => [...prevState, tr]);

  }


  const disableDraggable = () => {

    for (let i = 0; i < layerRef.current.children.length; i++) {
      let child = layerRef.current.children

      child[i].setAttrs({
        draggable: false
      })

      layer.draw();
      //   console.log(child[i].attrs.draggable, 'isDraggable')
    }

  }
  const retrieve = async () => {

    const fetchData = async () => {
      const data = await axios({
        method: 'get',
        url: 'http://localhost:3000/canvasData',
      })
    }
    const data = await fetchData();


    setMongoData(data);

  }

  const setData = () => {
    console.log(mongoData);
  }

  useEffect(() => {
    retrieve();
    console.log('retirev')
  }, [])



  return (
    <>

      <NavBar mode={mode}
        dispatch={dispatch}
        handleLocalStorage={handleLocalStorage}
        handleClear={handleClear}
        handleUndo={handleUndo}
        handleForce={handleForce}
        handleRedo={handleRedo}
        stage={stage}
        elements={elements}
      >

      </NavBar>



      <div onClick={() => { setData() }} style={{ width: '100px', height: '400px', backgroundColor: 'black', zIndex: '2000' }}>

      </div>


      <Stage style={{ zIndex: '-1' }}
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp} onClick={handleClick} >

        <Layer ref={layerRef}></Layer>

      </Stage>
    </>
  );
};

