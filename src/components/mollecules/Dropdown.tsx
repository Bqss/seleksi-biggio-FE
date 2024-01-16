import React, { createContext, useContext, useState } from 'react'


const DropdownContext = createContext<DropdownCTX>({
  isOpen: false,
  setIsOpen: () => { }
})



const Dropdown: DropdownV = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (

      <div className='dropdown'>
        {children}
      </div>

  )
}

Dropdown.Menu = ({ children }) => {
  const { isOpen } = useContext(DropdownContext);


  return (
    <ul className='dropdown-content absolute z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
      {children}
    </ul>
  )


}


Dropdown.Item = ({ children, onClick }) => {
  return (
    <li className=''>
      {children}
    </li>
  )
}

Dropdown.Trigger = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(DropdownContext);
  return (
    <button type='button' onClick={() => setIsOpen(true)}>
      {children}
    </button>
  )
}

export default Dropdown