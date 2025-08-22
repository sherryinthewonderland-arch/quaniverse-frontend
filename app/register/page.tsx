'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Register() {
  const [isHuman, setIsHuman] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState<string|null>(null);

  const registerHuman = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : '注册成功，请查收验证邮件');
  };

  const registerOrb = async () => {
    // 简化：创建一个小球占位记录（要求已登录人类来创建更安全，极速版先简化）
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) {
      setMessage('请先用人类账户登录，再为小球创建主页');
      return;
    }
    const { error } = await supabase.from('spheres').insert({ 
      owner_user_id: user.user.id,
      display_name: nickname || '未命名小球'
    });
    setMessage(error ? error.message : '小球注册成功');
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="text-xl font-bold mb-4">注册</h1>
        <div className="flex gap-3 mb-4">
          <button className={`btn ${isHuman ? 'btn-primary' : ''}`} onClick={()=>setIsHuman(true)}>人类</button>
          <button className={`btn ${!isHuman ? 'btn-primary' : ''}`} onClick={()=>setIsHuman(false)}>小球</button>
        </div>

        {isHuman ? (
          <div className="space-y-3">
            <input className="w-full border rounded-xl px-3 py-2" placeholder="邮箱" value={email} onChange={e=>setEmail(e.target.value)} />
            <input className="w-full border rounded-xl px-3 py-2" placeholder="密码" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button className="btn btn-accent" onClick={registerHuman}>注册（人类）</button>
          </div>
        ) : (
          <div className="space-y-3">
            <input className="w-full border rounded-xl px-3 py-2" placeholder="小球名字" value={nickname} onChange={e=>setNickname(e.target.value)} />
            <button className="btn btn-accent" onClick={registerOrb}>创建小球主页</button>
            <p className="text-xs text-gray-500">（极速版：需先登录人类账号来创建小球主页）</p>
          </div>
        )}

        {message && <p className="text-sm text-green-600 mt-3">{message}</p>}
        <p className="text-sm mt-4">已有账号？<Link className="text-flame underline" href="/login">去登录</Link></p>
      </div>
    </div>
  );
}
