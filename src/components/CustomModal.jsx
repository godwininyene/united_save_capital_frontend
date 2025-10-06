import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BiArrowBack } from 'react-icons/bi';
import { FaTimesCircle } from 'react-icons/fa';

export default function Modal({ children, show = false, maxWidth = '2xl', closeable = true, backDrop = false, onClose = () => {} }) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={() => {backDrop && close()}}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-black/50" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`bg-white dark:bg-slate-800 rounded-xl shadow-2xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass} w-full max-h-[85vh] overflow-y-auto relative`}
                    >
                        {/* Enhanced Close Button - Fixed positioning */}
                        <button 
                            className="absolute cursor-pointer top-4 right-4 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-full text-white p-2 z-50 shadow-2xl hover:scale-110 transition-all duration-200 border-2 border-white dark:border-slate-800"
                            onClick={() => close()}
                        >
                            <FaTimesCircle className="h-5 w-5" />
                        </button>
                        
                        {/* Mobile Back Button */}
                        <div className="md:hidden sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-600">
                            <button 
                                className="flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors w-full" 
                                onClick={() => close()}
                            >
                                <BiArrowBack className="h-5 w-5" /> 
                                <span className="font-medium">Back</span>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="pt-2 md:pt-0">
                            {children}
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}