import '../styles/main.css'
import * as Dialog from '@radix-ui/react-dialog'

import { MagnifyingGlassPlus } from 'phosphor-react'

export function CreateAdBanner() {
  return (
    

    <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>
      <div className='bg-[#2a2634] px-8 py-6 flex justify-between items-center'>
        <div>
          <strong className='text-xl text-white font-black block'>Não encontrou o seu duo?</strong>
          <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players</span>
        </div>
        <Dialog.Trigger>
          <button className='py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex gap-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </Dialog.Trigger>
      </div>
    </div>
  );
}