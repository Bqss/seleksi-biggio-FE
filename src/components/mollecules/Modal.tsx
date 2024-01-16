import React from "react"

const Modal: React.FC<ModalC> = ({ children, isOpen, title, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className='modal modal-open opacity-100'>
          <div className='modal-box'>
            <div className="flex px-2 justify-between py-4">
              <h1 className='text-2xl font-bold'>{title}</h1>
              <button className='hover:bg-slate-900 p-2' onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className='mt-6'>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal