import React, { useEffect, useReducer, useLayoutEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, AnimateSharedLayout, motion, useCycle } from "framer-motion";
import './Modal.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Paper from '@mui/material/Paper';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton'
import CloseIcon from '@mui/icons-material/Close';


export default function Modal({ }) {

  let data = [
    { name: 'name', value: 'value' },
    { name: 'name', value: 'value' },
    { name: 'name', value: 'value' },
  ]

  const [active, setActive] = useState(true);

  const mappedContent = data.map((item) => {

    return (
      <div className="modalItem">
        <p>{item.name}</p>
        <p>{item.value}</p>
      </div>

    )
  })





  return (
    <>
      <div className='modalButton'>
        <ToggleButtonGroup>
          <ToggleButton style={{ borderRadius: '40px' }} onClick={() => {
            setActive(!active)
          }}>
            {active ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div className='modalContainer'
            initial={{
              opacity: 0,
              hidden: true
            }}
            animate={{
              opacity: 1,
              hidden: false
            }}
            exit={{
              opacity: 0,
              transition: {
                ease: 'easeOut',
                duration: 0.3,
                opacity: 0,
              },
              hidden: true,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut'
            }}
          >
            <div className='modalTopRow'>
              <motion.div className='modalCloseButtonContainer'>
                <ToggleButton style={{ borderStroke: 'white' }} onClick={() => {
                  setActive(!active)
                }}>
                  <CloseIcon style={{ fontSize: 20 }}></CloseIcon>
                </ToggleButton>
              </motion.div>
            </div>


            <div className='modalContentContainer'>

              <div className='modalContentRow'>

                {mappedContent}
              </div>
              <div className='modalContentRow'>

                {mappedContent}
              </div>
              <div className='modalContentRow'>

                {mappedContent}
              </div>

            </div>


          </motion.div>
        )
        }

      </AnimatePresence>


      <div>

      </div>
    </>


  )

}