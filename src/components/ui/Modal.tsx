"use client";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  isDestructive?: boolean;
};

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  confirmText = "Confirmar", 
  cancelText = "Cancelar", 
  onConfirm,
  isDestructive = false
}: ModalProps) {
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[99]" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px]" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-sm transform overflow-hidden rounded-3xl bg-white p-7 text-left align-middle shadow-2xl transition-all">
                <DialogTitle as="h3" className="text-2xl font-bold leading-6 text-gray-900 mb-3 tracking-tight">
                  {title}
                </DialogTitle>
                <div className="mt-2 text-gray-600 text-lg">
                  {description}
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    type="button"
                    className={`inline-flex justify-center w-full items-center rounded-2xl border border-transparent px-4 h-16 text-xl font-bold text-white transition-colors focus:outline-none ${
                        isDestructive ? 'bg-red-600 hover:bg-red-700 active:bg-red-800' : 'bg-primary hover:bg-primary/90 active:bg-primary'
                    }`}
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full items-center rounded-2xl border-2 border-gray-200 bg-white px-4 h-16 text-xl font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:outline-none transition-colors"
                    onClick={onClose}
                  >
                    {cancelText}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
