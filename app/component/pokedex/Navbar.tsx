'use client';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import DexIcon from '@mui/icons-material/Apps';
import TypeIcon from '@mui/icons-material/Category';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function LabelBottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const currentValue = () => {
    if (pathname === '/pokedex/team') {
      return 'team';
    } else if (pathname === '/pokedex/dex') {
      return 'dex';
    } else if (pathname === '/pokedex/types') {
      return 'types';
    } else if (pathname === '/pokedex' || pathname === '/pokedex/') {
      return '';
    }
  }

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    router.push(`/pokedex/${newValue}`);
  };

  return (
    <>
      <nav className='top-0 left-0 right-0 border-b shadow-md fixed'>
        <BottomNavigation value={currentValue()} onChange={handleChange} className="bg-blue-500!">
          <BottomNavigationAction
            label="Home"
            value=""
            icon={<HomeIcon />}
            className='text-white!'
          />

          <BottomNavigationAction
            label="Dex"
            value="dex"
            icon={<DexIcon />}
            className='text-white!'
          />

          <BottomNavigationAction
            label="Types"
            value="types"
            icon={<TypeIcon />}
            className='text-white!'
          />

          <BottomNavigationAction
            label="Team"
            value="team"
            icon={<FavoriteIcon />}
            className='text-white!'
          />
        </BottomNavigation>
      </nav>
    </>
  );
}


// 'use client';

// import { useState, SyntheticEvent } from 'react';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import HomeIcon from '@mui/icons-material/Home';
// import { useRouter } from 'next/router';

// export default function LabelBottomNavigation() {
//   const [value, setValue] = useState('');

//   const handleChange = (event: SyntheticEvent, newValue: string) => {
//     setValue(newValue);
//     event.preventDefault();
//   };

//   return (
//     <>
//       <BottomNavigation value={value} onChange={handleChange}>

//         <BottomNavigationAction
//           label="Home"
//           value=""
//           icon={<HomeIcon />}
//         />

//         <BottomNavigationAction
//           label="Team"
//           value="team"
//           icon={<FavoriteIcon />}
//         />
//       </BottomNavigation>
//     </>
//   );
// }



{/*     
      <nav className="flex justify-between p-4 bg-blue-500 text-white px-10">
        <div className="flex space-x-6 items-center">
          <div className="text-3xl">
            <Link href="/pokedex">Pokedex</Link>
          </div>
          <div>
            <Link href="/pokedex">Home</Link>
          </div>
          <div>
            <Link href="/pokedex/dex">Pokédex</Link>
          </div>
          <div>
            <Link href="/pokedex/types">Types</Link>
          </div>
          <div>
            <Link href="/pokedex/team">Team</Link>
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          </div>
        </div>
        <div className="flex items-center">
          <p>Welcome Pokemon Master!</p>
        </div>
      </nav> */}