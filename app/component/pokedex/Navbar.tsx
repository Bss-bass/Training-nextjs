import Link from 'next/link';
import { Button } from '@/app/component/ui/button';

export default function LabelBottomNavigation() {

  return (
    <>
      <nav className="flex justify-between p-4 bg-blue-500 text-white px-10 fixed w-full top-0 z-10">
        <div className="flex space-x-6 items-center">
          <Link href="/pokedex" className='text-3xl font-bold'>Pokedex</Link>
          <Button variant='link' className='text-white text-md'>
            <Link href="/pokedex">Home</Link>
          </Button>
          <Button variant='link' className='text-white text-md'>
            <Link href="/pokedex/dex">Pokédex</Link>
          </Button>
          <Button variant='link' className='text-white text-md'>
            <Link href="/pokedex/types">Types</Link>
          </Button>
          <Button variant='link' className='text-white text-md'>
            <Link href="/pokedex/team">Team</Link>
          </Button>
        </div>
        <div className="flex items-center">
          <p>Welcome Pokemon Master!</p>
        </div>
      </nav>
    </>
  );
}
