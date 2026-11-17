const BASE=import.meta.env.VITE_API_URL||'http://localhost:5000/api';
export function getToken(){return localStorage.getItem('cp_token')}
async function request(path,options={}){const res=await fetch(`${BASE}${path}`,{...options,headers:{'Content-Type':'application/json',...(getToken()?{Authorization:`Bearer ${getToken()}`}:{}) ,...options.headers}});const data=await res.json();if(!res.ok)throw new Error(data.message||'Request failed');return data}
export const api={login:(email,password)=>request('/auth/login',{method:'POST',body:JSON.stringify({email,password})}),issues:()=>request('/issues'),createIssue:body=>request('/issues',{method:'POST',body:JSON.stringify(body)}),resources:()=>request('/resources')};
