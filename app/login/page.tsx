'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string|null>(null);
  const router = useRouter();

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMsg(error ? error.message : '登录成功');
    if (!error) router.push('/');
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="text-xl font-bold mb-4">登录</h1>
        <input className="w-full border rounded-xl px-3 py-2 mb-2" placeholder="邮箱" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded-xl px-3 py-2 mb-3" placeholder="密码" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-primary" onClick={login}>登录</button>
        {msg && <p className="text-sm text-green-600 mt-3">{msg}</p>}
      </div>
    </div>
  );
}
