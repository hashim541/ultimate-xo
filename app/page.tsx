import Board from "@/components/Board";
import { Settings } from "@/utils/data";


export default function Home(
  {searchParams}: {
    searchParams?:Settings
  }
) {
  
  const settings = {
    mode: searchParams?.mode || 'normal',
    players: searchParams?.players || '2'
  }
  

  return (
    <section className="h-full flex justify-center items-center ">

      <Board {...settings} />
      
    </section>
    
  );
}
