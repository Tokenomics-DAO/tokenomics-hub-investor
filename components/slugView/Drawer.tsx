import React from 'react'
import XMarkIcon from '../../public/svg/xmarkicon'

export default function Drawer({ children, isOpen, setIsOpen }) {
  return (
    <main
      className={
        'fixed inset-0 z-50 transform overflow-hidden drop-shadow-lg ease-in-out ' +
        (isOpen
          ? ' translate-x-0 transition-opacity duration-500  '
          : ' translate-x-full transition-all delay-500  ')
      }
    >
      <section
        className={
          'delay-400 absolute right-0 h-full transform bg-white shadow-xl transition-all duration-500 ease-in-out lg:w-1/2' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <div className="flex flex-col">
          <button
            type="button"
            className="mt-4 mr-4 self-end"
            onClick={() => {
              setIsOpen(false)
            }}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <article className="relative m-auto flex h-full flex-col space-y-6 overflow-y-scroll pb-10">
          {children}
        </article>
      </section>
      <section
        className=" h-full w-screen cursor-pointer "
        onClick={() => {
          setIsOpen(false)
        }}
      ></section>
    </main>
  )
}
