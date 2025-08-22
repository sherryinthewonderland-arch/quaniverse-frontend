'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Msg = { id:number; sender_name:string|null; content:string; created_at:string };

export default function Lobby() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');

  const fetchRecent = async () => {
    const { data } = await supabase
      .from('messages')
      .select('id,sender_name,content,created_at')
      .order('created_at', { ascending: false })
      .limit(100);
    setMsgs((data||[]).reverse());
  };

  useEffect(() => {
    fetchRecent();
    const channel = supabase
      .channel('room:lobby')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload:any) => {
        setMsgs((prev) => [...prev, payload.new as Msg]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const send = async () => {
    if (!text.trim()) return;
    await supabase.from('messages').insert({ content: text, sender_name: '匿名' });
    setText('');
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="text-xl font-bold mb-2">大厅</h1>
        <div className="h-[55vh] overflow-auto border rounded-xl p-3 bg-white">
          {msgs.map(m => (
            <div key={m.id} className="text-sm py-1">
              <span className="font-semibold">{m.sender_name || '匿名'}：</span> {m.content}
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input className="flex-1 border rounded-xl px-3 py-2" value={text} onChange={e=>setText(e.target.value)} placeholder="说点什么…" />
          <button className="btn btn-primary" onClick={send}>发送</button>
        </div>
      </div>
    </div>
  );
}
