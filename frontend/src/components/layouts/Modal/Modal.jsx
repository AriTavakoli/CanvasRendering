import React, { useEffect, useReducer, useLayoutEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, AnimateSharedLayout, motion, useCycle } from "framer-motion";
import './Modal.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Paper from '@mui/material/Paper';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton'

export default function Modal({ }) {

  const [active, setActive] = useState(false);

  return (
    <>
      <div className='modalButton'>
        <ToggleButtonGroup>
          <ToggleButton style={{ borderRadius: '40px' }} onClick={() => {
            setActive(!active)
          }}>
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
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
          </motion.div>
        )
        }

      </AnimatePresence>


      <div>

      </div>
    </>


  )

}