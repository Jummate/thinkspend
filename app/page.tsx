// 'use client';

import { supabase } from '@/lib/supabase/client';

export default function Home() {

  return <div>This is the landing page</div>
  
  // const handleSubmit = async () => {
  //   // const {data} = await supabase.from('expenses').select('*');
  //   // console.log("data", data);
  // };

  // return <button className="text-orange-500 text-4xl p-5 border-2" onClick={handleSubmit}>Fetch</button>;
}
