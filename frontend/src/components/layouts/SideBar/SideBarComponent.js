import React, { useEffect, useReducer, useLayoutEffect, useRef, memo, useState } from "react";
import Buttons from "@layouts/Buttons.js";
import modeReducer from "@components/modeReducer.js";
import { ModeContext, ModeDispatchContext } from '@components/ModeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AnimatePresence, AnimateSharedLayout, motion, useCycle } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from '@mui/material/ToggleButton';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import '@layouts/SideBar/SideBar.css';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import useFetch from '@components/hooks/useFetch.jsx';
import axios from 'axios';

export default function SideBarComponent({ handleLocalStorage, elements, handleForce, stage }) {

  const [isShown, setShown] = useState(false);

  const [count, setCount] = useState(0);

  const [style, setStyle] = useState();

  const mapped = Object.keys(localStorage).map((item) => {

    let parsedItem = JSON.parse(localStorage.getItem(item))

    // !! catching JSON parse

    // let url = parsedItem[1].dataUrl

    if (parsedItem[1] === undefined) {
      return
    } else {
      var url = parsedItem[1].dataUrl
    }
    // incase error persists, use this url
    //  let url = 'https://i.imgur.com/4Z5HJ7M.png'
    //on click add local-row-selected className
    return (
      <div className="local-row" onClick={() => {
        setStyle('local-row-selected')

      }}>
        <p>{item}</p>
        <img onClick={() => { handleForce(); handleLocalStorage(item) }} src={url} className="uploadImage" width='100px' alt="uploadImage"></img>
      </div>
    )
  })




  const handleSave = () => {

    var name = prompt("ID name", "ID");
    //display the current date and time
    const dataUrl = stage.toDataURL({ pixelRatio: 1 });

    const objWrapper = [{ elements }, { dataUrl }];

    localStorage.setItem(name, JSON.stringify(objWrapper));

    console.log(objWrapper)

    const fetchData = async () => {
      const data = await axios({
        method: 'post',
        url: 'http://localhost:3000/save',
        data: {
          pixelData: { title: 'ariDoc', body: 'sdsds' }
        }
      })
      console.log(data);
    }
    fetchData();
  }




  return (
    <>
      <ToggleButton onClick={() => { setShown(!isShown); }} >
        <LocalLibraryOutlinedIcon style={{ fontSize: 20, }} > </LocalLibraryOutlinedIcon>
      </ToggleButton>
      <AnimatePresence>
        {isShown && (
          <div >
            <motion.div
              layout
              className="side-bar"
              initial={{
                opacity: 0,
                x: 0,
                hidden: true,
              }}
              animate={{ x: '-0%', opacity: 1, hidden: false, }}
              exit={{
                x: 0,
                transition: { ease: 'easeOut', duration: 0.2, },
                hidden: true,
                opacity: 0,


              }}
              transition={{ ease: 'linear', duration: .2, }}
            >
              <motion.div className="close-button-container">
                <ToggleButton onClick={() => { setShown(!isShown); }}>
                  <CloseIcon style={{ fontSize: 20, }}></CloseIcon>
                </ToggleButton>
                {/*
                <ToggleButton>
                  <LocalLibraryOutlinedIcon style={{ fontSize: 20, }} > </LocalLibraryOutlinedIcon>
                </ToggleButton> */}


              </motion.div>




              <div className="local-container">
                <div>
                  <button onClick={() => { handleSave(); setCount(1) }}>Save</button>
                </div>
                <div>
                  <button onClick={() => { retrieve() }}>retrieve</button>
                </div>


                <div className="local-row">
                  <h4> Recently Saved</h4>
                </div>


                {mapped}

              </div>
            </motion.div>


          </div>
        )}
      </AnimatePresence>

    </>
  )

}