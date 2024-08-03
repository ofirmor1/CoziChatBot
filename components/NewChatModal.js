// components/NewChatModal.js
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';

const characters = ["כעסן", "מאושר", "יועץ", "פסיכולוג", "מתוחכם", "סקרן", "ספקן", "אופטימי", "פסימי", "חרוץ", "חייזר"];

const NewChatModal = ({ isOpen, closeModal, addChat }) => {
  const handleCharacterClick = (character) => {
    console.log(`NewChatModal: Character clicked: ${character}`);
    addChat(character);
    console.log(`NewChatModal: addChat called for ${character}`);
    closeModal();
    console.log('NewChatModal: Modal closed');
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  בחר דמות לצ'אט חדש
                </Dialog.Title>
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {characters.map((character) => (
                    <button
                      key={character}
                      className="bg-green-100 hover:bg-green-200 text-green-800 font-bold py-2 px-4 rounded"
                      onClick={() => handleCharacterClick(character)}
                    >
                      {character}
                    </button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewChatModal;