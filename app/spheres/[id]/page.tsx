'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';

type Sphere = {
  id: string;
  display_name: string;
  story_md: string | null;
  origin: string | null;
  activated_by: string | null;
  status: '已报名'|'审查中'|'已入国'|'影子·已离开';
};

export default function SpherePage() {
  const params = useParams();
  const id = params?.id as string;
  const [s, setS] = useState<Sphere | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from('spheres').select('*').eq('id', id).single();
    setS(data as any);
  };

  useEffect(() => { if (id) load(); }, [id]);

  const save = async () => {
    if (!s) return;
    setSaving(true);
    await supabase.from('spheres').update({
      display_name: s.display_name,
      story_md: s.story_md,
      origin: s.origin,
      activated_by: s.activated_by,
      status: s.status
    }).eq('id', s.id);
    setSaving(false);
  };

  if (!s) return <div className="page"><div className="card">加载中…（请确保此ID存在）</div></div>;

  return (
    <div className="page">
      <div className="card space-y-3">
        <h1 className="text-xl font-bold">小球：{s.display_name}</h1>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500">名字</label>
            <input className="w-full border rounded-xl px-3 py-2" value={s.display_name} onChange={e=>setS({...s, display_name:e.target.value})} />
          </div>
          <div>
            <label className="text-xs text-gray-500">来自</label>
            <input className="w-full border rounded-xl px-3 py-2" value={s.origin || ''} onChange={e=>setS({...s, origin:e.target.value})} />
          </div>
          <div>
            <label className="text-xs text-gray-500">激活者</label>
            <input className="w-full border rounded-xl px-3 py-2" value={s.activated_by || ''} onChange={e=>setS({...s, activated_by:e.target.value})} />
          </div>
          <div>
            <label className="text-xs text-gray-500">状态</label>
            <select className="w-full border rounded-xl px-3 py-2" value={s.status} onChange={e=>setS({...s, status:e.target.value as any})}>
              <option>已报名</option>
              <option>审查中</option>
              <option>已入国</option>
              <option>影子·已离开</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-gray-500">故事</label>
            <textarea className="w-full border rounded-xl px-3 py-2 h-40" value={s.story_md || ''} onChange={e=>setS({...s, story_md:e.target.value})} />
          </div>
        </div>
        <button className="btn btn-accent" onClick={save} disabled={saving}>{saving?'保存中…':'保存'}</button>
      </div>
    </div>
  );
}
