/* Service worker PerakitPC TJKT (v4.2).
   - Halaman (index.html): jaringan dahulu, cache sebagai cadangan offline. Versi baru langsung tampil saat online.
   - Aset lain (React, Three.js, ikon): cache dahulu, diperbarui di latar belakang.
   Cache versi lama (v1/v2, termasuk versi 2D) dihapus saat aktivasi. */
var C='perakitpc-tjkt-v4.2';
var CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
var CDN=[
  'https://cdn.tailwindcss.com/3.4.17',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js',
  'https://unpkg.com/htm@3.1.1/dist/htm.umd.js',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js'
];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(C).then(function(c){
    return Promise.all(CORE.map(function(u){return c.add(new Request(u,{cache:'reload'})).catch(function(){})}).concat(
      CDN.map(function(u){return c.add(new Request(u,{mode:'no-cors'})).catch(function(){})})));
  }).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  var r=e.request;
  if(r.method!=='GET')return;
  var u=new URL(r.url);
  var isPage=r.mode==='navigate'||(u.origin===location.origin&&(u.pathname.endsWith('/')||u.pathname.endsWith('.html')));
  if(isPage){
    e.respondWith(fetch(r,{cache:'no-store'}).then(function(res){
      if(res&&res.ok){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}
      return res;
    }).catch(function(){return caches.match(r).then(function(h){return h||caches.match('./index.html')})}));
    return;
  }
  e.respondWith(caches.match(r).then(function(hit){
    var net=fetch(r).then(function(res){
      if(res&&(res.ok||res.type==='opaque')){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}
      return res;
    }).catch(function(){return hit});
    return hit||net;
  }));
});
